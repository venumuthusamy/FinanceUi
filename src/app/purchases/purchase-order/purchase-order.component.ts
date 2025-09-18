import { Component } from '@angular/core';
type LineRow = { [k: string]: any };
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})

export class PurchaseOrderComponent {
   hover = false;
poHdr = {
  currency: 'SGD',
  fxRate: 1,           
  tax: 0,
  shipping: 0,
  discount: 0,
  terms: 'NET 30',
  incoterms: 'FOB',
  poDate: new Date().toISOString().split('T')[0], 
  deliveryDate: '' ,
  remarks: ''  ,
  approvalLevel: 'DeptHead',     
  approvalStatus: 'Pending',
  recurring:""     
};

  poLines: LineRow[] = [];
  poAddLine() { this.poLines = [...this.poLines, { tax: 'STD' }]; }
  poRemoveLine(i: number) { this.poLines = this.poLines.filter((_, idx) => idx !== i); }
  poChange(i: number, key: string, val: any) {
    const copy = [...this.poLines]; copy[i] = { ...copy[i], [key]: val }; this.poLines = copy;
  }
  get poTotals() {
  return this.calcTotals(this.poLines, this.poHdr.tax, this.poHdr.shipping, this.poHdr.discount);
}


  calcTotals(lines: LineRow[], taxRate = 0, shipping = 0, discount = 0) {
  const sum = lines.reduce((acc, l) => {
    const qty = Number(l['qty'] || 0);
    const price = Number(l['price'] || 0);
    const discPct = Number(l['disc'] || 0);
    return acc + qty * price * (1 - discPct / 100);
  }, 0);

  const tax = sum * (Number(taxRate) / 100);
  const grand = sum + tax + Number(shipping || 0) - Number(discount || 0);

  return {
    sum: this.round(sum),
    tax: this.round(tax),
    grand: this.round(grand),
  };
}
 round(n: any) { return Math.round((Number(n) || 0) * 100) / 100; }
 notify(msg: string) {
    alert(msg);
  }
   gridColsClass(cols: number) {
    return {
      'grid grid-cols-1 gap-3': true,
      'md:grid-cols-1': cols === 1,
      'md:grid-cols-2': cols === 2,
      'md:grid-cols-3': cols === 3,
      'md:grid-cols-4': cols === 4,
      'md:grid-cols-5': cols === 5,
      'md:grid-cols-6': cols === 6,
    };
  }
    trackByIndex = (i: number, _: any) => i;

    setApprovalStatus(status: string) {
  this.poHdr.approvalStatus = status;
  this.notify(`PO ${status} at ${this.poHdr.approvalLevel} level`);
}
}



