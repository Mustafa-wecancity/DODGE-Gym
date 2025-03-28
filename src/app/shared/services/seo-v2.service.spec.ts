import { TestBed } from '@angular/core/testing';

import { SeoV2Service } from './seo-v2.service';

describe('SeoV2Service', () => {
  let service: SeoV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
