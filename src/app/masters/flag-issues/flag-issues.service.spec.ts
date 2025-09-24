import { TestBed } from '@angular/core/testing';

import { FlagIssuesService } from './flag-issues.service';

describe('FlagIssuesService', () => {
  let service: FlagIssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagIssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
