import { TestBed } from '@angular/core/testing';

import { GubuyService } from './gubuy.service';

describe('GubuyService', () => {
  let service: GubuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GubuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
