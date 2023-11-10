import { TestBed } from '@angular/core/testing';

import { ContentResolver } from './content.resolver';

describe('ContentResolver', () => {
  let resolver: ContentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
