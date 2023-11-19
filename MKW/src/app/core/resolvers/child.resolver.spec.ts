import { TestBed } from '@angular/core/testing';

import { ChildResolver } from './child.resolver';

describe('ChildResolver', () => {
  let resolver: ChildResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ChildResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
