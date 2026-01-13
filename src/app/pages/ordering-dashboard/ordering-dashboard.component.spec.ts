import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingDashboardComponent } from './ordering-dashboard.component';

describe('OrderingDashboardComponent', () => {
  let component: OrderingDashboardComponent;
  let fixture: ComponentFixture<OrderingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
