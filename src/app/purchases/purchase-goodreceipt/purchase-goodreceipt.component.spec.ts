import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGoodreceiptComponent } from './purchase-goodreceipt.component';

describe('PurchaseGoodreceiptComponent', () => {
  let component: PurchaseGoodreceiptComponent;
  let fixture: ComponentFixture<PurchaseGoodreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseGoodreceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseGoodreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
