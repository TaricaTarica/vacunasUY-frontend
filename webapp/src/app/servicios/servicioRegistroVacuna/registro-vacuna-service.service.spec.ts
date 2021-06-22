import { TestBed } from '@angular/core/testing';

import { RegistroVacunaServiceService } from './registro-vacuna-service.service';

describe('RegistroVacunaServiceService', () => {
  let service: RegistroVacunaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroVacunaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
