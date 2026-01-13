import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarOrdersComponent } from './bar-orders.component';

describe('BarOrdersComponent', () => {
  let component: BarOrdersComponent;
  let fixture: ComponentFixture<BarOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
