import { TestBed } from '@angular/core/testing';

import { PaymenttermsService } from './paymentterms.service';

describe('PaymenttermsService', () => {
  let service: PaymenttermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymenttermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
