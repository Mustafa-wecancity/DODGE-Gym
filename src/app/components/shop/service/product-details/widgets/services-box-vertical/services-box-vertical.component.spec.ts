import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBoxVerticalComponent } from './services-box-vertical.component';

describe('ServicesBoxVerticalComponent', () => {
  let component: ServicesBoxVerticalComponent;
  let fixture: ComponentFixture<ServicesBoxVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBoxVerticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesBoxVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
