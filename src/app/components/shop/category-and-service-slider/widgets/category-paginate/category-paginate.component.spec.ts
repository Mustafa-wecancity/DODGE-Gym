import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPaginateComponent } from './category-paginate.component';

describe('CategoryPaginateComponent', () => {
  let component: CategoryPaginateComponent;
  let fixture: ComponentFixture<CategoryPaginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPaginateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryPaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
