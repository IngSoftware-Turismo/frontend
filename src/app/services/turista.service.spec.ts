/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TuristaService } from './turista.service';

describe('Service: Turista', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TuristaService]
    });
  });

  it('should ...', inject([TuristaService], (service: TuristaService) => {
    expect(service).toBeTruthy();
  }));
});
