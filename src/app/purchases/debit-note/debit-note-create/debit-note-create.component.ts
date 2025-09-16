import { Component } from '@angular/core';
type LineRow = { [k: string]: any };

@Component({
  selector: 'app-debit-note-create',
  templateUrl: './debit-note-create.component.html',
  styleUrls: ['./debit-note-create.component.css']
})
export class DebitNoteCreateComponent {
  pinRows: LineRow[] = [];

  // Add a new row
  pinAddRow() {
    this.pinRows.push({
      po: '',
      grn: '',
      item: '',
      qty: 0,
      price: 0,
      match: 'OK'
    });
  }
     // Returns
  retRows: LineRow[] = [];
  retAddRow() { this.retRows = [...this.retRows, {}]; }
  retRemoveRow(i: number) { this.retRows = this.retRows.filter((_, idx) => idx !== i); }
  retChange(i: number, key: string, val: any) {
    const copy = [...this.retRows]; copy[i] = { ...copy[i], [key]: val }; this.retRows = copy;
  }

  // Remove a row
  pinRemoveRow(i: number) {
    this.pinRows.splice(i, 1);
  }

  // Track by index for *ngFor
  trackByIndex(index: number) {
    return index;
  }

  // Badge color classes
  badgeClass(tone: 'emerald' | 'red' = 'emerald') {
    return {
      'inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold': true,
      'bg-emerald-50 text-emerald-700 border border-emerald-100': tone === 'emerald',
      'bg-red-50 text-red-700 border border-red-100': tone === 'red'
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
    // Demo Notifications
  notify(msg: string) {
    alert(msg);
  }
}
