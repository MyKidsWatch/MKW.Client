import { TestBed } from '@angular/core/testing';

import { UserReviewResolver } from './user-review.resolver';

describe('UserReviewResolver', () => {
  let resolver: UserReviewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserReviewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
