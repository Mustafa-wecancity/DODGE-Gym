import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentForOrderServiceComponent } from './attachment-for-order-service.component';

describe('AttachmentForOrderServiceComponent', () => {
  let component: AttachmentForOrderServiceComponent;
  let fixture: ComponentFixture<AttachmentForOrderServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentForOrderServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttachmentForOrderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
