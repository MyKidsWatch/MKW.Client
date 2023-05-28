import { TestBed } from '@angular/core/testing';

import { AgeRangeService } from './age-range.service';

describe('AgeRangeService', () => {
  let service: AgeRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgeRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
