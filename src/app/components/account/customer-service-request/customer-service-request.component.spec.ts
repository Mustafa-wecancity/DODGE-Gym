import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceRequestComponent } from './customer-service-request.component';

describe('CustomerServiceRequestComponent', () => {
  let component: CustomerServiceRequestComponent;
  let fixture: ComponentFixture<CustomerServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerServiceRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
