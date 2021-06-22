import { TestBed } from '@angular/core/testing';

import { VacunaServiceService } from './vacuna-service.service';

describe('VacunaServiceService', () => {
  let service: VacunaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
