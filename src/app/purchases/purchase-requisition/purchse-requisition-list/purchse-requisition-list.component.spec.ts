import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchseRequisitionListComponent } from './purchse-requisition-list.component';

describe('PurchseRequisitionListComponent', () => {
  let component: PurchseRequisitionListComponent;
  let fixture: ComponentFixture<PurchseRequisitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchseRequisitionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchseRequisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
