
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CreditVoucherService } from '../credit-voucher-service';

@Component({
  selector: 'app-credit-voucher-list',
  templateUrl: './credit-voucher-list.component.html',
  styleUrls: ['./credit-voucher-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CreditVoucherListComponent {
  headervalue: any
  creditVoucherList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  creditVoucherName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private creditVoucherService : CreditVoucherService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Credit Voucher';
     this.creditVoucherService.getCreditVoucher().subscribe((data :any) => {
            this.creditVoucherList = data
      });  
  }
  createCreditVoucher(){
    this.router.navigateByUrl('financial/creditvoucher/create')
  }
  editCreditVoucher(item : any){
    this.router.navigateByUrl(`financial/creditvoucher/edit/${item.id}`)
  }
  deleteCreditVoucher(item : any){
    this.creditVoucherService.deleteCreditVoucher(item.id).subscribe((res)=>{
      this.toast.showSuccess("Credit Voucher Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterCreditVoucher() {
    this.creditVoucherService.getCreditVoucher().subscribe((data :any) => {
        this.filteredList = data
          if (this.creditVoucherName) {
        this.filteredList = this.filteredList.filter((x: any) =>
          (!this.creditVoucherName || x.name.toLowerCase().includes(this.creditVoucherName.toLowerCase()))

        );
        }
        this.creditVoucherList = this.filteredList;
        this.page = 1;
    });
  }
  clearField(field: string) {
    if (field === 'creditVoucherName') {
      this.creditVoucherName = '';
    } 
    this.filterCreditVoucher();
  } 

  confirmdeleteCreditVoucher(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteCreditVoucher(item);
          },
          reject: () => {
          }
        });
  }
}





















