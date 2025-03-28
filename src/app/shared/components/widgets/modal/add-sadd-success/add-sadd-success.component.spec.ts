import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaddSuccessComponent } from './add-sadd-success.component';

describe('AddSaddSuccessComponent', () => {
  let component: AddSaddSuccessComponent;
  let fixture: ComponentFixture<AddSaddSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSaddSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSaddSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
