import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HookahOrdersComponent } from './hookah-orders.component';

describe('HookahOrdersComponent', () => {
  let component: HookahOrdersComponent;
  let fixture: ComponentFixture<HookahOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HookahOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HookahOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
