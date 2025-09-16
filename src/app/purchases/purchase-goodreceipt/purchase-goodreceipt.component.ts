import { Component } from '@angular/core';

type LineRow = { [k: string]: any };
@Component({
  selector: 'app-purchase-goodreceipt',
  templateUrl: './purchase-goodreceipt.component.html',
  styleUrls: ['./purchase-goodreceipt.component.css']
})
export class PurchaseGoodreceiptComponent {
  hover = false;
grnRows: LineRow[] = [];
  grnAddRow() { this.grnRows = [...this.grnRows, {}]; }
  grnRemoveRow(i: number) { this.grnRows = this.grnRows.filter((_, idx) => idx !== i); }
  grnChange(i: number, key: string, val: any) {
    const copy = [...this.grnRows]; copy[i] = { ...copy[i], [key]: val }; this.grnRows = copy;
  }
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
}
