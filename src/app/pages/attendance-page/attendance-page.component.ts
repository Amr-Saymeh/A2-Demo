import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, onValue, update, get } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

interface AttendanceRecord {
  datein?: string;
  dateout?: string;
}

interface Employee {
  id: string;
  name: string;
  password: string;
  imageUrl?: string;
  age?: number;
  salary?: number;
  role?: string;
  attendance?: Record<string, AttendanceRecord>;
}

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.css']
})
export class AttendancePageComponent {
  restaurantId = '';
  employees: Employee[] = [];
  name = '';
  password = '';
  message = '';
  loading = false;

  // 🔐 For the Sign-Out modal
  showSignOutModal = false;
  signOutName = '';
  signOutPassword = '';
  signOutEmpId = '';

  constructor(private db: Database, private route: ActivatedRoute, private ngZone: NgZone) {}

  ngOnInit() {
    const rid = this.route.snapshot.paramMap.get('restId');
    if (rid) this.restaurantId = rid;
    this.loadEmployees();
  }

  /** ✅ Live load of employees */
  private loadEmployees() {
    const employeesRef = ref(this.db, `restaurants/${this.restaurantId}/employees`);
    onValue(employeesRef, (snapshot) => {
      this.ngZone.run(() => {
        const data = snapshot.val() || {};
        this.employees = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      });
    });
  }

  /** ✅ Employee Sign In */
  async signIn() {
    this.message = '';
    if (!this.name.trim() || !this.password.trim()) {
      this.message = '⚠️ Please enter name and password.';
      return;
    }

    this.loading = true;
    try {
      const employeesRef = ref(this.db, `restaurants/${this.restaurantId}/employees`);
      const snap = await get(employeesRef);
      const employees = snap.val() || {};

      let foundKey: string | null = null;
      Object.keys(employees).forEach((key) => {
        const emp = employees[key];
        if (emp.name === this.name.trim() && emp.password === this.password.trim()) {
          foundKey = key;
        }
      });

      if (!foundKey) {
        this.message = '❌ Invalid name or password.';
        this.loading = false;
        return;
      }

      const today = new Date();
      const hourTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateKey = today.toISOString().split('T')[0];
      const empRef = ref(this.db, `restaurants/${this.restaurantId}/employees/${foundKey}/attendance/${dateKey}`);

      await update(empRef, { datein: hourTime });

      this.message = `✅ ${this.name} signed in at ${hourTime}`;
      this.clearFields();
    } catch (err) {
      console.error(err);
      this.message = '❌ Failed to sign in.';
    } finally {
      this.loading = false;
    }
  }

  /** 🧾 Open Sign-Out Modal */
  openSignOutModal(empId: string, empName: string) {
    this.signOutEmpId = empId;
    this.signOutName = empName;
    this.signOutPassword = '';
    this.showSignOutModal = true;
  }

  /** ❌ Close Sign-Out Modal */
  closeSignOutModal() {
    this.showSignOutModal = false;
    this.signOutEmpId = '';
    this.signOutName = '';
    this.signOutPassword = '';
  }

  /** ✅ Confirm Sign Out with hidden password input */
  async confirmSignOut() {
    if (!this.signOutName.trim() || !this.signOutPassword.trim()) {
      alert('⚠️ Please enter name and password.');
      return;
    }

    const employeesRef = ref(this.db, `restaurants/${this.restaurantId}/employees`);
    const snap = await get(employeesRef);
    const employees = snap.val() || {};

    let validEmployee: string | null = null;
    Object.keys(employees).forEach((key) => {
      const emp = employees[key];
      if (emp.name === this.signOutName.trim() && emp.password === this.signOutPassword.trim()) {
        validEmployee = key;
      }
    });

    if (!validEmployee || validEmployee !== this.signOutEmpId) {
      alert('❌ Invalid credentials or employee mismatch.');
      return;
    }

    const today = new Date();
    const hourTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateKey = today.toISOString().split('T')[0];
    const empRef = ref(this.db, `restaurants/${this.restaurantId}/employees/${this.signOutEmpId}/attendance/${dateKey}`);

    await update(empRef, { dateout: hourTime });
    alert(`✅ Signed out successfully at ${hourTime}`);
    this.closeSignOutModal();
  }

  private clearFields() {
    this.name = '';
    this.password = '';
  }

  /** ✅ Check if employee signed in today */
  isHere(emp: Employee): boolean {
    const today = new Date().toISOString().split('T')[0];
    return !!emp.attendance?.[today]?.datein && !emp.attendance?.[today]?.dateout;
  }

  getTodayTime(emp: Employee): string {
    const today = new Date().toISOString().split('T')[0];
    return emp.attendance?.[today]?.datein || '-';
  }
}
