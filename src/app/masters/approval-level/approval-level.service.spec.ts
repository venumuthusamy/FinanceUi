import { TestBed } from '@angular/core/testing';

import { ApprovalLevelService } from './approval-level.service';

describe('ApprovalLevelService', () => {
  let service: ApprovalLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
