import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAllInputsComponent } from './filter-all-inputs.component';

describe('FilterAllInputsComponent', () => {
  let component: FilterAllInputsComponent;
  let fixture: ComponentFixture<FilterAllInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAllInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterAllInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
