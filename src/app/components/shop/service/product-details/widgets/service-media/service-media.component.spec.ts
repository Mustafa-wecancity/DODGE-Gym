import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMediaComponent } from './service-media.component';

describe('ServiceMediaComponent', () => {
  let component: ServiceMediaComponent;
  let fixture: ComponentFixture<ServiceMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceMediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
