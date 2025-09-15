import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DebitVoucherService } from '../debit-voucher-service';

@Component({
  selector: 'app-debit-voucher-list',
  templateUrl: './debit-voucher-list.component.html',
  styleUrls: ['./debit-voucher-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DebitVoucherListComponent {
  headervalue: any
  debitVoucherList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  debitVoucherName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private debitVoucherService : DebitVoucherService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Debit Voucher';
     this.debitVoucherService.getDebitVoucher().subscribe((data :any) => {
            this.debitVoucherList = data
      });  
  }
  createDebitVoucher(){
    this.router.navigateByUrl('financial/debitvoucher/create')
  }
  editDebitVoucher(item : any){
    this.router.navigateByUrl(`financial/debitvoucher/edit/${item.id}`)
  }
  deleteDebitVoucher(item : any){
    this.debitVoucherService.deleteDebitVoucher(item.id).subscribe((res)=>{
      this.toast.showSuccess("Debit Voucher Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterDebitVoucher() {
    this.debitVoucherService.getDebitVoucher().subscribe((data :any) => {
      this.filteredList = data
        if (this.debitVoucherName) {
        this.filteredList = this.filteredList.filter((x: any) =>
          (!this.debitVoucherName || x.name.toLowerCase().includes(this.debitVoucherName.toLowerCase()))

        );
        }
        this.debitVoucherList = this.filteredList;
        this.page = 1;
    });
  }
  clearField(field: string) {
    if (field === 'debitVoucherName') {
      this.debitVoucherName = '';
    } 
    this.filterDebitVoucher();
  } 

  confirmdeleteDebitVoucher(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteDebitVoucher(item);
          },
          reject: () => {
          }
        });
  }
}


















