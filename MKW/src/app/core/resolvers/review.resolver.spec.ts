import { TestBed } from '@angular/core/testing';

import { ReviewResolver } from './review.resolver';

describe('ReviewResolver', () => {
  let resolver: ReviewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReviewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
