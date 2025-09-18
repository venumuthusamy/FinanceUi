import { Component } from '@angular/core';

type LineRow = { [k: string]: any };
@Component({
  selector: 'app-purchase-requisition',
  templateUrl: './purchase-requisition.component.html',
  styleUrls: ['./purchase-requisition.component.css']
})
export class PurchaseRequisitionComponent {
  hover = false;
 prSteps = ['Header', 'Lines', 'Review & Submit'];
  prStep = 0;
  prHeader = { neededBy: '', oversea: false, multiLoc: false };
  prLines: LineRow[] = [];
  prGo(n: number) { this.prStep = Math.min(this.prSteps.length - 1, Math.max(0, this.prStep + n)); }
  prAddLine() { this.prLines = [...this.prLines, {}]; }
  prRemoveLine(i: number) { this.prLines = this.prLines.filter((_, idx) => idx !== i); }
  prChange(i: number, key: string, val: any) {
    const copy = [...this.prLines]; copy[i] = { ...copy[i], [key]: val }; this.prLines = copy;
  }
   trackByIndex = (i: number, _: any) => i;
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
    badgeClass(tone: 'emerald' | 'amber' | 'red' | 'gray' = 'emerald') {
    return {
      'inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold': true,
      'bg-emerald-50 text-emerald-700 border border-emerald-100': tone === 'emerald',
      'bg-amber-50 text-amber-700 border border-amber-100': tone === 'amber',
      'bg-red-50 text-red-700 border border-red-100': tone === 'red',
      'bg-gray-50 text-gray-700 border border-gray-200': tone === 'gray',
    };
  }
  
}
