import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-control-board',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    @if (!isAuthenticated) {
      <div class="login-wrapper d-flex align-items-center justify-content-center">
        <div class="login-card p-4">
          <h4 class="mb-3 text-center">Control Board Sign In</h4>
          <form (ngSubmit)="signIn()">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input class="form-control" [(ngModel)]="username" name="username" autocomplete="username" />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input class="form-control" type="password" [(ngModel)]="password" name="password" autocomplete="current-password" />
            </div>
            @if (error) { <div class="alert alert-danger py-2">{{ error }}</div> }
            <button type="submit" class="btn btn-primary w-100">Sign In</button>
          </form>
        </div>
      </div>
    }
    @if (isAuthenticated) {
      <main class="p-4 admin-page">
        <div class="container-fluid">
          <h2 class="mb-3">Welcome</h2>
          <p class="text-muted">Choose a section from the sidebar to manage <strong>{{ rid }}</strong>.</p>
        </div>
      </main>
    }
  `,
  styles: [`
    :host { display: block; max-width: 100vw; overflow-x: hidden; }
    .login-wrapper { min-height: 100vh; background: #f8fafc; padding: 24px; }
    .login-card { width: 100%; max-width: 380px; background: #fff; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 10px 24px rgba(0,0,0,.06); }
    .admin-page { min-height: 100vh; }
  `]
})
export class ControlBoardComponent implements OnInit {
  rid: string = 'rest1';
  isAuthenticated = false;
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private adminAuth: AdminAuthService) {}

  ngOnInit(): void {
    const p = this.route.snapshot.paramMap.get('restId');
    if (p) this.rid = p;
    this.isAuthenticated = this.adminAuth.isAuthenticated();
    if (this.isAuthenticated) {
      // If already authenticated, go directly to dashboard
      this.router.navigate(['/', this.rid, 'dashboard']);
    }
  }

  signIn() {
    this.error = '';
    const ok = this.adminAuth.signIn(this.username, this.password);
    if (ok) {
      this.isAuthenticated = true;
      this.username = '';
      this.password = '';
      this.router.navigate(['/', this.rid, 'dashboard']);
    } else {
      this.error = 'Invalid username or password.';
    }
  }
}
