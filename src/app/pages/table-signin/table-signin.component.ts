import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TableSessionService } from '../../services/table-session.service';

@Component({
  selector: 'app-table-signin',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container d-flex flex-column align-items-center justify-content-center" style="min-height: 70vh;">
      <div class="text-center">
        @if (!error) {
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        }
        @if (!error) {
          <h3 class="mt-3">Signing you in...</h3>
        }
        @if (error) {
          <div class="alert alert-danger mt-3">{{ error }}</div>
        }
      </div>
    </div>
    `,
})
export class TableSigninComponent implements OnInit {
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableSession: TableSessionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const restId = this.route.snapshot.paramMap.get('restId');
    const tableId = this.route.snapshot.paramMap.get('tableId');

    if (!restId || !tableId) {
      this.error = 'Invalid table link.';
      return;
    }

    try {
      await this.tableSession.signInForTable(restId, tableId);
      this.router.navigateByUrl('/');
    } catch (e: any) {
      console.error(e);
      this.error = e?.message || 'Failed to sign in for this table.';
    }
  }
}
