import { Component } from '@angular/core';
type DocRow = { name: string; number: string; expiry: string };
@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.css']
})
export class SupplierProfileComponent {
  hover = false;
  supplier = {
    name: '',
    code: '',
    status: 'Active',
    leadTime: 7,
    terms: 'COD',
    currency: 'SGD',
    taxReg: '',
    incoterms: 'EXW',
    contact: '',
    email: '',
    phone: '',
    address: '',
    bank: { name: '', acc: '', swift: '', branch: '' },
  };
  preferredItems: string[] = ['Rice 5kg', 'Cooking Oil 2L'];
  preferredText = '';
  docs: DocRow[] = [
    { name: 'Business Registration', number: '', expiry: '' },
    { name: 'GST/VAT Certificate', number: '', expiry: '' },
    { name: 'Food Safety Cert', number: '', expiry: '' },
    { name: 'NDA', number: '', expiry: '' },
  ];
  addPreferred() {
    const t = (this.preferredText || '').trim();
    if (!t) return;
    this.preferredItems = [...this.preferredItems, t];
    this.preferredText = '';
  }
  removePreferred(i: number) { this.preferredItems = this.preferredItems.filter((_, idx) => idx !== i); }
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
   removeDoc(i: number) {
    this.docs = this.docs.filter((_, idx) => idx !== i);
  }

  addDoc() {
    this.docs = [...this.docs, { name: '', number: '', expiry: '' }];
  }
}
