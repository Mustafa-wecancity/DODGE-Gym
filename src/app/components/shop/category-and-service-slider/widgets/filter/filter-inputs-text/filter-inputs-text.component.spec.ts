import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterInputsTextComponent } from './filter-inputs-text.component';

describe('FilterInputsTextComponent', () => {
  let component: FilterInputsTextComponent;
  let fixture: ComponentFixture<FilterInputsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterInputsTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterInputsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
