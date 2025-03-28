import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBoxComponent } from './services-box.component';

describe('ServicesBoxComponent', () => {
  let component: ServicesBoxComponent;
  let fixture: ComponentFixture<ServicesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
