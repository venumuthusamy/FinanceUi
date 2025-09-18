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

  ngOnInit() {
  setInterval(() => {
    this.checkPendingInspections();
  }, 60 * 60 * 1000); // every 1 hour
}


  // Add a new line
  grnAddRow() {
    const newRow: LineRow = {
      po: '',
      item: '',
      batch: '',
      expiry: '',
      qty: 0,
      qc: 'Verify',
      temperature: null,
      location: '',
      photos: [],
      inspectors: '',
      remarks: '',
      createdAt: new Date() // for reminders
    };
    this.grnRows = [...this.grnRows, newRow];
  }

  // Remove a line
  grnRemoveRow(i: number) {
    this.grnRows = this.grnRows.filter((_, idx) => idx !== i);
  }

  // Upload photos per line
  uploadPhoto(event: any, index: number) {
    const files = Array.from(event.target.files);
    this.grnRows[index]['photos'] = files;
  }

  // Notify alerts
  notify(msg: string) {
    alert(msg);
  }

  // Grid helper
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

checkPendingInspections() {
  const now = new Date().getTime();

  this.grnRows.forEach((r) => {
    if (r['qc'] === 'Verify') {
      const created = new Date(r['createdAt']).getTime();
      const diffHours = (now - created) / 1000 / 60 / 60; // difference in hours

      if (diffHours >= 24 && diffHours < 48) {
        console.warn(`Reminder: QC pending for item "${r['item']}" for ${Math.floor(diffHours)} hours.`);
      } else if (diffHours >= 48) {
        console.error(`Alert: QC pending for item "${r['item']}" for more than 48 hours!`);
      }
    }
  });
}
isPending24to48(r: any) {
  if (r['qc'] !== 'Verify') return false;
  const diffHours = (new Date().getTime() - new Date(r['createdAt']).getTime()) / 1000 / 60 / 60;
  return diffHours >= 24 && diffHours < 48;
}

isPending48Plus(r: any) {
  if (r['qc'] !== 'Verify') return false;
  const diffHours = (new Date().getTime() - new Date(r['createdAt']).getTime()) / 1000 / 60 / 60;
  return diffHours >= 48;
}

}
