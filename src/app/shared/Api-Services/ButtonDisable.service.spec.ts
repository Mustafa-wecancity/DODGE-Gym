/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ButtonDisableService } from './ButtonDisable.service';

describe('Service: ButtonDisable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ButtonDisableService]
    });
  });

  it('should ...', inject([ButtonDisableService], (service: ButtonDisableService) => {
    expect(service).toBeTruthy();
  }));
});
