import { Component } from '@angular/core';

type LineRow = { [k: string]: any };

@Component({
  selector: 'app-supplier-invoice-create',
  templateUrl: './supplier-invoice-create.component.html',
  styleUrls: ['./supplier-invoice-create.component.css']
})
export class SupplierInvoiceCreateComponent {

// PIN Header
  pinHdr = { invoiceNo: '', date: '', amount: 0, tax: 0 };

  // PIN Line Items
  pinRows: LineRow[] = [];

  trackByIndex = (i: number, _: any) => i;

  badgeClass(tone: 'emerald' | 'amber' | 'red' | 'gray' = 'emerald') {
    return {
      'inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold': true,
      'bg-emerald-50 text-emerald-700 border border-emerald-100': tone === 'emerald',
      'bg-amber-50 text-amber-700 border border-amber-100': tone === 'amber',
      'bg-red-50 text-red-700 border border-red-100': tone === 'red',
      'bg-gray-50 text-gray-700 border border-gray-200': tone === 'gray',
    };
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

  // Row Operations
  pinAddRow() { 
    this.pinRows = [...this.pinRows, { match: 'OK' }]; 
  }

  pinRemoveRow(i: number) { 
    this.pinRows = this.pinRows.filter((_, idx) => idx !== i); 
  }

  pinChange(i: number, key: string, val: any) {
    const copy = [...this.pinRows];
    copy[i] = { ...copy[i], [key]: val };
    this.pinRows = copy;
  }

  // Demo Notifications
  notify(msg: string) {
    alert(msg);
  }
}
