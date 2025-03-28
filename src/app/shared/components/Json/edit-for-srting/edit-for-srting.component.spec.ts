import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditForSrtingComponent } from './edit-for-srting.component';

describe('EditForSrtingComponent', () => {
  let component: EditForSrtingComponent;
  let fixture: ComponentFixture<EditForSrtingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditForSrtingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditForSrtingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
