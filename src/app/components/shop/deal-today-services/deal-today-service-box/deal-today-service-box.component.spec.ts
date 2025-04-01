import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealTodayServiceBoxComponent } from './deal-today-service-box.component';

describe('DealTodayServiceBoxComponent', () => {
  let component: DealTodayServiceBoxComponent;
  let fixture: ComponentFixture<DealTodayServiceBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealTodayServiceBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealTodayServiceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
