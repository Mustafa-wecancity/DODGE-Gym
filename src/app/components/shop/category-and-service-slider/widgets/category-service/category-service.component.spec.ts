import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryServiceProdctComponent } from './category-service.component';

describe('CategoryServiceProdctComponent', () => {
  let component: CategoryServiceProdctComponent;
  let fixture: ComponentFixture<CategoryServiceProdctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryServiceProdctComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryServiceProdctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
