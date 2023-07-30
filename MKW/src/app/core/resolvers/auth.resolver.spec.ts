import { TestBed } from '@angular/core/testing';

import { AuthResolver } from './auth.resolver';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
