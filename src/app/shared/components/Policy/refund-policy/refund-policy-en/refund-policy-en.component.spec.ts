import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPolicyEnComponent } from './refund-policy-en.component';

describe('RefundPolicyEnComponent', () => {
  let component: RefundPolicyEnComponent;
  let fixture: ComponentFixture<RefundPolicyEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefundPolicyEnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundPolicyEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
