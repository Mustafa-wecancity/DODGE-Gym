import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAndServiceSliderComponent } from './category-and-service-slider.component';

describe('CategoryAndServiceSliderComponent', () => {
  let component: CategoryAndServiceSliderComponent;
  let fixture: ComponentFixture<CategoryAndServiceSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAndServiceSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryAndServiceSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
