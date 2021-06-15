import { TestBed } from '@angular/core/testing';

import { VacunadorServiceService } from './vacunador-service.service';

describe('VacunadorServiceService', () => {
  let service: VacunadorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunadorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
