import { Component } from '@angular/core';


@Component({
  selector: 'app-rfq-create',
  templateUrl: './rfq-create.component.html',
  styleUrls: ['./rfq-create.component.css']
})
export class RfqCreateComponent {

// RFQ
rfqSuppliers: string[] = ['FreshFoods', 'Ocean Imports', 'Pack&Ship'];
rfqSupplierText = '';
rfqItems: { item: string; qty: number }[] = [
  { item: 'Rice 5kg', qty: 40 },
  { item: 'Oil 2L', qty: 24 }
];
rfqQuotes: { [supplier: string]: { [idx: number]: number | string } } = {};

  

trackByIndex = (i: number, _: any) => i;

addRfqSupplier() {
  const t = (this.rfqSupplierText || '').trim();
  if (!t) return;
  this.rfqSuppliers = [...this.rfqSuppliers, t];
  this.rfqSupplierText = '';
}

removeRfqSupplier(i: number) {
  this.rfqSuppliers = this.rfqSuppliers.filter((_, idx) => idx !== i);
}

setQuotePrice(supplier: string, idx: number, price: any) {
  this.rfqQuotes = {
    ...this.rfqQuotes,
    [supplier]: {
      ...(this.rfqQuotes[supplier] || {}),
      [idx]: price
    }
  };
}

notify(msg: string) {
  alert(msg);
}


}
