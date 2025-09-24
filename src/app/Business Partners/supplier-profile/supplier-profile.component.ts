import { Component } from '@angular/core';
import { CurrencyService } from 'src/app/masters/currency/currency.service';
import { ItemService } from 'src/app/masters/item/item-service';
import { PaymentTermsService } from 'src/app/masters/paymentterms/paymentterms.service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
type DocRow = { name: string; number: string; expiry: string };
@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.css']
})
export class SupplierProfileComponent {
   constructor(
      private paymentTermsService: PaymentTermsService,
      private currencyService: CurrencyService,
      private toast: ToastService,
       private itemService : ItemService,
    ) {}
    
  hover = false;
  statusList = ['Active', 'Inactive', 'On Hold'];
filteredStatus = [...this.statusList];
statusDropdownOpen = false;

  termsList: any[] = [];
  filteredTerms: any[] = [];
  termsDropdownOpen: boolean = false;
  termsSearch: string = '';
statusSearch = '';


 currencyList: any[] = [];
filteredCurrencies: any[] = [];
currencyDropdownOpen: boolean = false;
currencySearch: string = '';

    incotermsList: string[] = ['FOB', 'CIF', 'EXW'];
  filteredIncoterms: string[] = [...this.incotermsList];
  incotermDropdownOpen: boolean = false;
  incotermSearch: string = '';
  preferredItems: any[] = []; // Selected preferred items
preferredText: string = ''; // Current input value
itemsList: any[] = [];      // Full item list from API
filteredItems: any[] = []; 
  supplier = {
     termsId: null,
     termsName: '',
     currencyId:null,
     currencyName:'',
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
 
  docs: DocRow[] = [
    { name: 'Business Registration', number: '', expiry: '' },
    { name: 'GST/VAT Certificate', number: '', expiry: '' },
    { name: 'Food Safety Cert', number: '', expiry: '' },
    { name: 'NDA', number: '', expiry: '' },
  ];
   ngOnInit(): void {
     this.loadPaymentTerms();
     this.loadCurrencies();
     this.loadItem();
    }
  addPreferred() {
    const t = (this.preferredText || '').trim();
    if (!t) return;
    this.preferredItems = [...this.preferredItems, t];
    this.preferredText = '';
  }
  // removePreferred(i: number) { this.preferredItems = this.preferredItems.filter((_, idx) => idx !== i); }

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
  filterStatus() {
    this.filteredStatus = this.statusList.filter(s =>
      s.toLowerCase().includes(this.statusSearch.toLowerCase())
    );
  }

  selectStatus(s: string) {
    this.supplier.status = s;
    this.statusSearch = s;
    this.statusDropdownOpen = false;
  }
filterTerms() {
  if (!this.termsList) return;
  this.filteredTerms = this.termsList.filter(t =>
    t.paymentTermsName.toLowerCase().includes(this.termsSearch.toLowerCase())
  );
}

selectTerm(t: any) {
  this.supplier.termsId = t.id;                 // save ID
  this.supplier.termsName = t.paymentTermsName; // save name
  this.termsSearch = t.paymentTermsName;        // show name in input
  this.termsDropdownOpen = false;
}

 
loadCurrencies() {
  this.currencyService.getAll().subscribe((res: any) => {
    this.currencyList = res.data;            // API response
    this.filteredCurrencies = [...this.currencyList]; // show all initially
    console.log("currencyList", this.currencyList);
  });
}

filterCurrencies() {
  if (!this.currencyList) return;
  this.filteredCurrencies = this.currencyList.filter(c =>
    c.currencyName.toLowerCase().includes(this.currencySearch.toLowerCase())
  );
}

selectCurrency(c: any) {
  this.supplier.currencyId = c.id;          // save ID
  this.supplier.currencyName = c.currencyName; // save name
  this.currencySearch = c.currencyName;        // show name in input
  this.currencyDropdownOpen = false;
}
  filterIncoterms() {
    this.filteredIncoterms = this.incotermsList.filter(i =>
      i.toLowerCase().includes(this.incotermSearch.toLowerCase())
    );
  }

  selectIncoterm(i: string) {
    this.supplier.incoterms = i;
    this.incotermSearch = i;
    this.incotermDropdownOpen = false;
  }
  loadPaymentTerms() {
  this.paymentTermsService.getAll().subscribe((res: any) => {
    this.termsList = res.data;
    this.filteredTerms = [...this.termsList]; // ✅ show all initially
    console.log("termsList", this.termsList);
  });
}
loadItem() {
 this.itemService.getItem().subscribe((res: any) => {
  this.itemsList = res.map((item:any) => ({ ...item }));
  console.log("itemlist",this.itemsList)
});

}
filterItems() {
  const search = this.preferredText.toLowerCase();
  if (!search) {
    this.filteredItems = [];
    return;
  }

  this.filteredItems = this.itemsList.filter(item =>
    item.itemName.toLowerCase().includes(search) &&
    !this.preferredItems.some(pi => pi.id === item.id)
  );
}

// Highlight matching text
highlightMatch(name: string): string {
  if (!this.preferredText) return name;
  const search = this.preferredText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape special chars
  const regex = new RegExp(`(${search})`, 'gi');
  return name.replace(regex, `<strong>$1</strong>`);
}

// Select item
selectPreferred(item: any) {
  this.preferredItems.push(item);
  this.preferredText = '';
  this.filteredItems = [];
}
selectFirstFilteredItem(event: Event) {
  const keyboardEvent = event as KeyboardEvent; // cast inside TS
  if (this.filteredItems.length) {
    this.selectPreferred(this.filteredItems[0]);
    keyboardEvent.preventDefault(); // prevent form submission or default behavior
  }
}

// Remove selected item
removePreferred(index: number) {
  this.preferredItems.splice(index, 1);
}

// Optional: Add by typing custom text
addPreferredFromSearch() {
  const match = this.itemsList.find(item => item.itemName.toLowerCase() === this.preferredText.toLowerCase());
  if (match && !this.preferredItems.includes(match)) {
    this.preferredItems.push(match);
  }
  this.preferredText = '';
  this.filteredItems = [];
}


// TrackBy for ngFor
trackByIndex(index: number) {
  return index;
}
onKeyDown(event: Event) {
  const keyboardEvent = event as KeyboardEvent;
  if (keyboardEvent.key === 'Enter' && this.filteredItems.length) {
    this.selectPreferred(this.filteredItems[0]);
    keyboardEvent.preventDefault();
  }
}

}
