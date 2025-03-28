import { TestBed } from '@angular/core/testing';

import { TetstInterceptor } from './tetst.interceptor';

describe('TetstInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TetstInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TetstInterceptor = TestBed.inject(TetstInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
