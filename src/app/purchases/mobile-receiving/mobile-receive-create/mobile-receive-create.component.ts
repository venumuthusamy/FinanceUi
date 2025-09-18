import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-receive-create',
  templateUrl: './mobile-receive-create.component.html',
  styleUrls: ['./mobile-receive-create.component.css']
})
export class MobileReceiveCreateComponent implements OnInit {

  // === Existing properties ===
  mrPo = '';
  mrBarcode = '';
  mrRows: { po: string; barcode: string; qty: number; ts: string; inspected?: boolean }[] = [];
  mrOffline = true;

  // === Quality Check ===
  qc = {
    temperature: null as number | null,
    location: '',
    remarks: ''
  };

  // === Multi-inspector approval ===
  inspectors = [
    { name: 'Inspector 1', approved: false },
    { name: 'Inspector 2', approved: false },
    { name: 'Inspector 3', approved: false }
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadOffline();
    this.checkReminders();
  }

  // === Grid helper ===
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

  // === Track by index for ngFor ===
  trackByIndex = (i: number, _: any) => i;

  // === Add scanned item ===
  addScan() {
    if (!this.mrBarcode) return;
    this.mrRows = [
      { po: this.mrPo, barcode: this.mrBarcode, qty: 1, ts: new Date().toISOString(), inspected: false },
      ...this.mrRows
    ];
    this.mrBarcode = '';
    this.persistMobile();
  }

  // === Toggle offline save ===
  toggleOffline() { 
    this.mrOffline = !this.mrOffline; 
    this.persistMobile(); 
  }

  // === Sync offline to server (demo) ===
  syncMobile() { 
    this.mrOffline = false; 
    alert('Synced to server (demo)'); 
  }

  // === Save offline to localStorage ===
  persistMobile() {
    if (!this.mrOffline) return;
    try { 
      localStorage.setItem('uw_mobile_receiving', JSON.stringify(this.mrRows)); 
    } catch {}
  }

  // === Load offline data on init ===
  loadOffline() {
    const stored = localStorage.getItem('uw_mobile_receiving');
    if (stored) {
      try {
        this.mrRows = JSON.parse(stored);
      } catch {}
    }
  }

  // === Upload photo for ISO/Halal ===
  uploadPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploaded photo:', file);
      // TODO: Add logic to save/display uploaded photo
    }
  }

  // === Reminder logic: check uninspected items > 24–48 hrs ===
  checkReminders() {
    const now = new Date();
    this.mrRows.forEach(row => {
      if (!row.inspected) {
        const ts = new Date(row.ts);
        const diffHrs = (now.getTime() - ts.getTime()) / 1000 / 60 / 60;
        if (diffHrs > 24) {
          console.warn(`Reminder: PO ${row.po} barcode ${row.barcode} not inspected for ${Math.floor(diffHrs)} hours`);
        }
      }
    });
  }
}
