import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-receive-create',
  templateUrl: './mobile-receive-create.component.html',
  styleUrls: ['./mobile-receive-create.component.css']
})
export class MobileReceiveCreateComponent {

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
  mrPo = '';
  mrBarcode = '';
  mrRows: { po: string; barcode: string; qty: number; ts: string }[] = [];
  mrOffline = true;
  addScan() {
    if (!this.mrBarcode) return;
    this.mrRows = [{ po: this.mrPo, barcode: this.mrBarcode, qty: 1, ts: new Date().toISOString() }, ...this.mrRows];
    this.mrBarcode = '';
    this.persistMobile();
  }
  toggleOffline() { this.mrOffline = !this.mrOffline; this.persistMobile(); }
  syncMobile() { this.mrOffline = false; alert('Synced to server (demo)'); }
  persistMobile() {
    if (!this.mrOffline) return;
    try { localStorage.setItem('uw_mobile_receiving', JSON.stringify(this.mrRows)); } catch {}
  }
}
