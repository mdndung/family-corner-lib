import { TestBed } from '@angular/core/testing';

import { FamilyCornerLibService } from './family-corner-lib.service';

describe('FamilyCornerLibService', () => {
  let service: FamilyCornerLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyCornerLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
