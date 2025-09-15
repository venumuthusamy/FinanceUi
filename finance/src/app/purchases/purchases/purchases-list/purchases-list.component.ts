import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PurchasesInnerService } from '../purchases-service';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PurchasesListComponent {

  headervalue: any
  purchasesList : any = []
  searchText: any
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchSupplierName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private purchasesInnerService : PurchasesInnerService,
    private toast: ToastService,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ){

  }

  ngOnInit(){    
    this.headervalue = 'Purchases'
    this.purchasesInnerService.getPurchases().subscribe((data :any) => {
    const supplierDetails = data|| '{}';
     if (supplierDetails) {
        this.purchasesList = supplierDetails
        
    } else {
        this.purchasesList = supplierDetails;
    }  
    });   
  }
  createPurchases(){
    this.router.navigateByUrl('purchases/purchases/create')
  }
  editPurchases(item : any){
    this.router.navigateByUrl(`purchases/purchases/edit/${item.id}`)
  }
  deletePurchases(item : any){
      this.purchasesInnerService.deletePurchases(item.id).subscribe((res)=>{
         this.ngOnInit() 
         this.toast.showSuccess("Purchases Deleted Successfully")
      })
  }
  filterPurchases() {
    this.purchasesInnerService.getPurchases().subscribe((data :any) => {
        this.filteredList = data
        if (this.searchSupplierName) {
        this.filteredList = this.filteredList.filter((employee: any) =>
          (!this.searchSupplierName || employee.supplierName.toLowerCase().includes(this.searchSupplierName.toLowerCase()))
        );
        }
        this.purchasesList = this.filteredList;
        this.page = 1;
      }); 
  }
  clearField(field: string) {
    if (field === 'searchSupplierName') {
      this.searchSupplierName = '';
    } 
    this.filterPurchases();
  }
  formatDate = (dateStr: string | Date): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
  };
  downloadExcel() {
    const data = this.purchasesList.map((item: any) => ({
      ID: item.id,
      'Supplier Name': item.supplierName,
      Date: this.formatDate(item.date),
      'Payment Account': item.paymentAccount,
      'Grand Total': item.grandTotal,
      Discount: item.discount,
      'Total Discount': item.totalDiscount,
      GST: item.gst,
      'Total Tax': item.totalTax,
      'Shipping Cost': item.shippingCost,      
      'Net Total': item.netTotal,
      'Paid Amount': item.paidAmount,
      Due: item.due,
      Change: item.change,
      Details: item.details
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Purchases Data': worksheet }, SheetNames: ['Purchases Data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    const blobData: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blobData, 'PurchasesData.xlsx');
  }
  
  downloadPDF() {
    const doc = new jsPDF('l');
    const head = [[
      'ID', 'Supplier Name', 'Date', 'Payment Account','Grand Total', 'Discount', 
      'Total Discount', 'GST', 'Total Tax', 'Shipping Cost', 
       'Net Total', 'Paid Amount', 'Due', 'Change', 'Details'
    ]];
    const data = this.purchasesList.map((item:any)=> [
      item.id, item.supplierName, this.formatDate(item.date), item.paymentAccount,item.grandTotal, item.discount,
      item.totalDiscount, item.gst, item.totalTax, item.shippingCost,
       item.netTotal, item.paidAmount, item.due, item.change, item.details
    ]);  
    autoTable(doc, {
      head: head,
      body: data,
      styles: { fontSize: 8 }
    });  
    doc.save('PurchasesData.pdf');
  }

  confirmdeletePurchases(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deletePurchases(item);
          },
          reject: () => {
          }
        });
  }
}









