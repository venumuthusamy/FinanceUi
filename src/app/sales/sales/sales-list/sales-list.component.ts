import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SalesInnerService } from '../sales.service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SalesListComponent {

  headervalue: any
  salesList : any = []
  searchText: any
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchCustomerName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private salesInnerService : SalesInnerService,
    private toast: ToastService,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ){

  }

  ngOnInit(){    
    this.headervalue = 'Sales'
    this.salesInnerService.getSales().subscribe((data :any) => {
    const customerDetails = data|| '{}';
     if (customerDetails) {
        this.salesList = customerDetails
        this.salesInnerService.setData(this.salesList);
    } else {
        this.salesList = customerDetails;
    }  
    });   
  }
  createSales(){
    this.router.navigateByUrl('sales/sales/create')
  }
  editSales(item : any){
    this.router.navigateByUrl(`sales/sales/edit/${item.id}`)
  }
  deleteSales(item : any){
      this.salesInnerService.deleteSales(item.id).subscribe((res)=>{
         this.ngOnInit() 
         this.toast.showSuccess("Sales Deleted Successfully")
      })
  }
  filterSales() {
    this.salesInnerService.getSales().subscribe((data :any) => {
        this.filteredList = data
        if (this.searchCustomerName) {
        this.filteredList = this.filteredList.filter((employee: any) =>
          (!this.searchCustomerName || employee.customerName.toLowerCase().includes(this.searchCustomerName.toLowerCase()))
        );
        }
        this.salesList = this.filteredList;
        this.page = 1;
      }); 
  }
  clearField(field: string) {
    if (field === 'searchCustomerName') {
      this.searchCustomerName = '';
    } 
    this.filterSales();
  }
  formatDate = (dateStr: string | Date): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
  };
  downloadExcel() {
    const data = this.salesList.map((item: any) => ({
      ID: item.id,
      'Customer Name': item.customerName,
      Date: this.formatDate(item.date),
      'Payment Account': item.paymentAccount,
      'Grand Total': item.grandTotal,
      'Discount(%)': item.discount,
      'Total Discount': item.totalDiscount,
       'GST Amount': item.gst,
      'Total Tax': item.totalTax,
      'Shipping Cost': item.shippingCost,
      'Net Total': item.netTotal,
      'Paid Amount': item.paidAmount,
      Due: item.due,
      Change: item.change,
      Details: item.details
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sales Data': worksheet }, SheetNames: ['Sales Data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    const blobData: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blobData, 'SalesData.xlsx');
  }
  
  downloadPDF() {
    const doc = new jsPDF('l');
    const head = [[
      'ID', 'Customer Name', 'Date', 'Payment Account', 'Grand Total','Discount', 
      'Total Discount', 'GST', 'Total Tax', 'Shipping Cost', 
       'Net Total', 'Paid Amount', 'Due', 'Change', 'Details'
    ]];
    const data = this.salesList.map((item:any)=> [
      item.id, item.customerName, this.formatDate(item.date), item.paymentAccount,item.grandTotal, item.discount,
      item.totalDiscount, item.gst, item.totalTax, item.shippingCost,
       item.netTotal, item.paidAmount, item.due, item.change, item.details
    ]);  
    autoTable(doc, {
      head: head,
      body: data,
      styles: { fontSize: 8 }
    });  
    doc.save('SalesData.pdf');
  }

  confirmdeleteSales(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteSales(item);
          },
          reject: () => {
          }
        });
  }
}





