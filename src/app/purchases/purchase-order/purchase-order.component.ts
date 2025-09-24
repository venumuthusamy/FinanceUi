import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService } from './purchase-order-service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
type LineRow = { [k: string]: any };

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})

export class PurchaseOrderComponent {

  hover = false;
  poHdr : any = {
    id:0,
    purchaseOrderNo:'',
    supplierId:0,
    approveLevelId:0,
    paymentTermId:0,
    currencyId:0,
    deliveryId:0,
    contactNumber:'',
    incotermsId:0,
    poDate:new Date(),
    deliveryDate: new Date() ,
    remarks:'',
    // currency: 'SGD',
    fxRate: 0,                  
    tax: 0,
    shipping: 0,
    discount: 0,   
    subTotal:0,
    netTotal:0,
    // approvalLevel: 'DeptHead',     
    approvalStatus: '',    
  };
  purchaseOrderId: any;

  formatDate(date: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  const day = ('0' + d.getDate()).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
  poLines: any[] = [];

  searchTexts: { [key: string]: string } = {
  approval:'',  
  supplier: '',
  paymentTerms: '',
  currency: '',
  delivery: '',
  incoterms: ''
  };

  dropdownOpen: { [key: string]: boolean } = {
    approval:false,
    supplier: false,
    paymentTerms: false,
    currency: false,
    delivery: false,
    incoterms: false
  };
  approvalLevel = [
    { id: 1, name: 'Department Head' },
    { id: 2, name: 'Management' },
    { id: 3, name: 'Auto-Approve' },
  ];
  suppliers = [
    { id: 1, name: 'Sangeetha Restaurants' },
    { id: 2, name: 'Rajbhavan' },
    { id: 3, name: 'Crescent' },
  ];
  paymentTerms = [
    { id: 1, name: '30 days' },
    { id: 2, name: '60 days' },
    { id: 3, name: '90 days' },
  ];
   currencies = [
    { id: 1, name: 'SGD' },
    { id: 2, name: 'INR' },
    { id: 3, name: 'USD' },
  ];
   deliveries = [
    { id: 1, name: 'chennai' },
    { id: 2, name: 'delhi' },
    { id: 3, name: 'singapore' },
  ];
   incoterms = [
    { id: 1, name: 'FOB' },
    { id: 2, name: 'EXB' },
    { id: 3, name: 'CIF' },
  ];
  
 filteredLists: { [key: string]: any[] } = {
  approval: [...this.approvalLevel],
  supplier: [...this.suppliers],
  paymentTerms: [...this.paymentTerms],
  currency: [...this.currencies],
  delivery: [...this.deliveries],
  incoterms: [...this.incoterms]
 };
 
  
  allPrNos = ['PO123', 'PO456', 'PO789'];

  allItems = [
    { code: 'ITM001', name: 'Printer' },
    { code: 'ITM002', name: 'Scanner' },
    { code: 'ITM003', name: 'Monitor' }
  ];

  allBudgets = ['Marketing', 'IT', 'HR'];

  allRecurring = ['One-Time', 'Monthly', 'Yearly'];

  allTaxCodes = ['STD', 'ZRL', 'EXM'];
 

  constructor(private purchaseOrderService: PurchaseOrderService, private router: Router,
     private toast: ToastService,private route: ActivatedRoute,
  ) { }

   ngOnInit() {
    debugger
    this.route.paramMap.subscribe((params :any)=> {
            this.purchaseOrderId = parseInt(params.get('id'));
            if (this.purchaseOrderId) {
              
              this.purchaseOrderService.getPurchaseOrderById(this.purchaseOrderId).subscribe((data :any) => {
              
                this.poHdr = {
                    id: data.id,
                    purchaseOrderNo: data.purchaseOrderNo,
                    supplierId: data.supplierId,
                    approveLevelId: data.approveLevelId,
                    paymentTermId: data.paymentTermId,
                    currencyId: data.currencyId,
                    deliveryId: data.deliveryId,
                    contactNumber: data.contactNumber,
                    incotermsId: data.incotermsId,
                    remarks: data.remarks,
                    // currency: 'SGD',
                    fxRate:  data.fxRate,                  
                    tax: data.tax,
                    shipping:  data.shipping,
                    discount: data.discount,   
                    subTotal: data.subTotal,
                    netTotal: data.netTotal,
                    // approvalLevel: 'DeptHead',     
                    approvalStatus: data.approvalStatus,    
                  };
                  this.poHdr.poDate = new Date(data.poDate);        // keep as Date
                  this.poHdr.deliveryDate = this.toISODate(new Date(data.deliveryDate));

                    const selectedApproveLevel = this.approvalLevel.find(d => d.id === this.poHdr.approveLevelId);
                    if (selectedApproveLevel) {
                      this.searchTexts['approval'] = selectedApproveLevel.name;
                    }
                    const selectedSupplier = this.suppliers.find(d => d.id === this.poHdr.supplierId);
                    if (selectedSupplier) {
                      this.searchTexts['supplier'] = selectedSupplier.name;
                    }
                    const selectedPaymentTerms = this.paymentTerms.find(d => d.id === this.poHdr.paymentTermId);
                    if (selectedPaymentTerms) {
                      this.searchTexts['paymentTerms'] = selectedPaymentTerms.name;
                    }
                    const selectedCurrency = this.currencies.find(d => d.id === this.poHdr.currencyId);
                    if (selectedCurrency) {
                      this.searchTexts['currency'] = selectedCurrency.name;
                    }
                    const selectedDelivery = this.deliveries.find(d => d.id === this.poHdr.deliveryId);
                    if (selectedDelivery) {
                      this.searchTexts['delivery'] = selectedDelivery.name;
                    }
                    const selectedIncoterms = this.incoterms.find(d => d.id === this.poHdr.incotermsId);
                    if (selectedIncoterms) {
                      this.searchTexts['incoterms'] = selectedIncoterms.name;
                    }

                    this.poLines =  JSON.parse(data.poLines)
              }); 
              
            } else {
                       
            }
          });
   }

  toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  setApprovalStatus(status: string) {
    debugger
    this.poHdr.approvalStatus = status;
    // this.notify(`PO ${status} at ${this.poHdr.approvalLevel} level`);
    this.saveRequest()
  }

   @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    // if the click is NOT inside the main wrapper (div.relative)
    if (!target.closest('.relative')) {
       for (let key in this.dropdownOpen) {
      this.dropdownOpen[key] = false;
    }
    }
  }

    toggleDropdown(field: string, open?: boolean) {
      debugger
    this.dropdownOpen[field] = open !== undefined ? open : !this.dropdownOpen[field];
     if (this.dropdownOpen[field]) {
    switch(field) {
      case 'approval': this.filteredLists[field] = [...this.approvalLevel]; break;
      case 'supplier': this.filteredLists[field] = [...this.suppliers]; break;
      case 'paymentTerms': this.filteredLists[field] = [...this.paymentTerms]; break;
      case 'currency': this.filteredLists[field] = [...this.currencies]; break;
      case 'delivery': this.filteredLists[field] = [...this.deliveries]; break;
      case 'incoterms': this.filteredLists[field] = [...this.incoterms]; break;
    }
  }
  }

    // Filter function
    filter(field: string) {
    const search = this.searchTexts[field].toLowerCase();

    switch (field) {
      case 'approval':
        this.filteredLists[field] = this.approvalLevel.filter(s => s.name.toLowerCase().includes(search));
        break;
      case 'supplier':
        this.filteredLists[field] = this.suppliers.filter(s => s.name.toLowerCase().includes(search));
        break;
      case 'paymentTerms':
        this.filteredLists[field] = this.paymentTerms.filter(p => p.name.toLowerCase().includes(search));
        break;
      case 'currency':
        this.filteredLists[field] = this.currencies.filter(c => c.name.toLowerCase().includes(search));
        break;
      case 'delivery':
        this.filteredLists[field] = this.deliveries.filter(d => d.name.toLowerCase().includes(search));
        break;
      case 'incoterms':
        this.filteredLists[field] = this.incoterms.filter(i => i.name.toLowerCase().includes(search));
        break;
    }
  }

  //  Select item
  select(field: string, item: any) {
    this.searchTexts[field] = item.name;
    switch (field) {
    case 'approval':
    this.poHdr.approveLevelId = item.id;
    break;
    case 'supplier':
      this.poHdr.supplierId = item.id;
      break;
    case 'paymentTerms':
      this.poHdr.paymentTermId = item.id;
      break;
    case 'currency':
      this.poHdr.currencyId = item.id;
      break;
    case 'delivery':
      this.poHdr.deliveryId = item.id;
      break;
    case 'incoterms':
      this.poHdr.incotermsId = item.id;
      break;
  }
    this.dropdownOpen[field] = false;
  }

   // Clear search
  onClearSearch(field: string) {
    this.searchTexts[field] = '';
    this.dropdownOpen[field] = false;
  }


  //--------------- table ----------//

  openDropdown(index: number, field: string) {
    debugger
  this.poLines[index].dropdownOpen = field;
  this.filterOptions(index, field); // show all initially
  }

  filterOptions(index: number, field: string) {
  const searchValue = (this.poLines[index][field] || '').toLowerCase();

  if (field === 'prNo') {
    this.poLines[index].filteredOptions = this.allPrNos
      .filter(x => x.toLowerCase().includes(searchValue));
  }

  if (field === 'item') {
    this.poLines[index].filteredOptions = this.allItems
      .filter(x =>
        x.code.toLowerCase().includes(searchValue) ||
        x.name.toLowerCase().includes(searchValue)
      );
  }

  if (field === 'budget') {
    this.poLines[index].filteredOptions = this.allBudgets
      .filter(x => x.toLowerCase().includes(searchValue));
  }

  if (field === 'recurring') {
    this.poLines[index].filteredOptions = this.allRecurring
      .filter(x => x.toLowerCase().includes(searchValue));
  }

  if (field === 'taxCode') {
    this.poLines[index].filteredOptions = this.allTaxCodes
      .filter(x => x.toLowerCase().includes(searchValue));
  }
}

selectOption(index: number, field: string, option: any) {
  if (field === 'item') {
    this.poLines[index].item = `${option.code} - ${option.name}`;
  } else {
    this.poLines[index][field] = option;
  }

  this.poLines[index].dropdownOpen = ''; // close dropdown
}

 poAddLine() { 
    // this.poLines = [...this.poLines, { tax: 'STD' }]; 
  this.poLines.push({
    prNo:'',
    item: '',
    description:'',
    budget:'',
    recurring:'',
    qty: 0,
    price: '',
    discount: '',
    taxCode: '',  
    
    
    dropdownOpen: '',
    filteredOptions: []
  });
  }
  poRemoveLine(i: number) { 
    // this.poLines = this.poLines.filter((_, idx) => idx !== i); 
    this.poLines.splice(i, 1);
  }
  poChange(i: number, key: string, val: any) {
    const copy = [...this.poLines]; copy[i] = { ...copy[i], [key]: val }; this.poLines = copy;
  }
  get poTotals() {
  return this.calcTotals(this.poLines, this.poHdr.tax, this.poHdr.shipping, this.poHdr.discount);
  }
  trackByIndex = (i: number, _: any) => i;


  calcTotals(lines: LineRow[], taxRate = 0, shipping = 0, discount = 0) {
    const sum = lines.reduce((acc, l) => {
      const qty = Number(l['qty'] || 0);
      const price = Number(l['price'] || 0);
      const discPct = Number(l['discount'] || 0);
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

   saveRequest() {
    debugger
    const payload = {
    id:this.poHdr.id ? this.poHdr.id :0,
    purchaseOrderNo : this.poHdr.purchaseOrderNo ? this.poHdr.purchaseOrderNo : '',
    supplierId: this.poHdr.supplierId,
    approveLevelId: this.poHdr.approveLevelId,
    paymentTermId: this.poHdr.paymentTermId,
    currencyId: this.poHdr.currencyId,
    fxRate:  this.poHdr.fxRate,
    deliveryId: this.poHdr.deliveryId,
    contactNumber: this.poHdr.contactNumber,
    incotermsId: this.poHdr.incotermsId,
    poDate: this.poHdr.poDate,
    deliveryDate: this.poHdr.deliveryDate,
    remarks: this.poHdr.remarks,
    // currency: 'SGD',                  
    tax:  this.poHdr.tax,
    shipping: this.poHdr.shipping,
    discount: this.poHdr.discount,   
    subTotal: parseFloat(this.poTotals.sum.toFixed(2)),
    netTotal: parseFloat(this.poTotals.grand.toFixed(2)),
    // approvalLevel: 'DeptHead',     
    approvalStatus: this.poHdr.approvalStatus,
    poLines: JSON.stringify(this.poLines)
    };
  
    if (this.poHdr.id && this.poHdr.id > 0) {
      // 🔹 Update request
      this.purchaseOrderService.updatePurchaseOrder(this.poHdr.id, payload).subscribe({
        next: (res: any) => {
           this.toast.showSuccess('Purchase Order updated successfully')
           this.router.navigateByUrl(`/purchases/order`)
        },
        error: (err: any) => {
         this.toast.showApiError(err)
        }
      });
    } else {
      // 🔹 Create request
      this.purchaseOrderService.insertPurchaseOrder(payload).subscribe({
        next: (res: any) => {
          this.toast.showSuccess('Purchase Order saved successfully')
          this.router.navigateByUrl(`/purchases/order`)
        },
        error: (err: any) => {
          this.toast.showApiError(err)
        }
      });
    }
  }

  cancel(){
     this.router.navigate(['/purchases/order']);
  }
}



