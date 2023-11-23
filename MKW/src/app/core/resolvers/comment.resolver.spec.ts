import { TestBed } from '@angular/core/testing';

import { CommentResolver } from './comment.resolver';

describe('CommentResolver', () => {
  let resolver: CommentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CommentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
