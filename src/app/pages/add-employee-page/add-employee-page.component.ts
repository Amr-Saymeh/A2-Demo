import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, push, set, onValue } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

interface Employee {
  id: string;
  name: string;
  password: string;
  role?: string;
  imageUrl?: string;
  age?: number;
  salary?: number;
}

@Component({
  selector: 'app-add-employee-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.css']
})
export class AddEmployeePageComponent implements OnInit {
  restaurantId = '';
  name = '';
  password = '';
  role = '';
  imageUrl = '';
  age: number | null = null;
  salary: number | null = null;
  message = '';
  loading = false;

  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  constructor(private db: Database, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const rid = this.route.snapshot.paramMap.get('restId');
    if (rid) this.restaurantId = rid;

    const employeesRef = ref(this.db, `restaurants/${this.restaurantId}/employees`);
    onValue(employeesRef, (snapshot) => {
      const data = snapshot.val() || {};
      this.employees = Object.keys(data).map((id) => ({
        id,
        ...data[id]
      }));
    });
  }

  async addEmployee() {
    this.message = '';
    if (!this.name.trim() || !this.password.trim()) {
      this.message = '⚠️ Please fill all required fields.';
      return;
    }

    this.loading = true;
    try {
      const employeesRef = ref(this.db, `restaurants/${this.restaurantId}/employees`);
      const newEmployeeRef = push(employeesRef);
      await set(newEmployeeRef, {
        name: this.name.trim(),
        password: this.password.trim(),
        role: this.role.trim() || 'Employee',
        imageUrl: this.imageUrl.trim() || '',
        age: this.age || null,
        salary: this.salary || null
      });

      this.message = `✅ Employee "${this.name}" added successfully.`;
      this.name = '';
      this.password = '';
      this.role = '';
      this.imageUrl = '';
      this.age = null;
      this.salary = null;
    } catch (err) {
      console.error(err);
      this.message = '❌ Failed to add employee.';
    } finally {
      this.loading = false;
    }
  }

  openEmployeeDetails(emp: Employee) {
    this.selectedEmployee = emp;
  }

  closeModal() {
    this.selectedEmployee = null;
  }
}
