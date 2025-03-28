import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandConditionsEnComponent } from './termsand-conditions-en.component';

describe('TermsandConditionsEnComponent', () => {
  let component: TermsandConditionsEnComponent;
  let fixture: ComponentFixture<TermsandConditionsEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsandConditionsEnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsandConditionsEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
