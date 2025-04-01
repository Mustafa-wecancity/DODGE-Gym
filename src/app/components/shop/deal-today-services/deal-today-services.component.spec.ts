import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealTodayServicesComponent } from './deal-today-services.component';

describe('DealTodayServicesComponent', () => {
  let component: DealTodayServicesComponent;
  let fixture: ComponentFixture<DealTodayServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealTodayServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealTodayServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
