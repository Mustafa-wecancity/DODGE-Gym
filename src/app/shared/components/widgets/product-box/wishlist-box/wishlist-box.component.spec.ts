import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistBoxComponent } from './wishlist-box.component';

describe('WishlistBoxComponent', () => {
  let component: WishlistBoxComponent;
  let fixture: ComponentFixture<WishlistBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WishlistBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
