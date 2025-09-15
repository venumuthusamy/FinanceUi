import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContraVoucherService } from '../contra-voucher-service';

@Component({
  selector: 'app-contra-voucher-list',
  templateUrl: './contra-voucher-list.component.html',
  styleUrls: ['./contra-voucher-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ContraVoucherListComponent {
  headervalue: any
  contraVoucherList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  contraVoucherName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private contraVoucherService : ContraVoucherService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Contra Voucher';
     this.contraVoucherService.getContraVoucher().subscribe((data :any) => {
            this.contraVoucherList = data
      });  
  }
  createContraVoucher(){
    this.router.navigateByUrl('financial/contravoucher/create')
  }
  editContraVoucher(item : any){
    this.router.navigateByUrl(`financial/contravoucher/edit/${item.id}`)
  }
  deleteContraVoucher(item : any){
    this.contraVoucherService.deleteContraVoucher(item.id).subscribe((res)=>{
      this.toast.showSuccess("Contra Voucher Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterContraVoucher() {
    this.contraVoucherService.getContraVoucher().subscribe((data :any) => {
      this.filteredList = data
        if (this.contraVoucherName) {
        this.filteredList = this.filteredList.filter((x: any) =>
          (!this.contraVoucherName || x.name.toLowerCase().includes(this.contraVoucherName.toLowerCase()))

        );
        }
        this.contraVoucherList = this.filteredList;
        this.page = 1;
    });
  }
  clearField(field: string) {
    if (field === 'contraVoucherName') {
      this.contraVoucherName = '';
    } 
    this.filterContraVoucher();
  } 

  confirmdeleteContraVoucher(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteContraVoucher(item);
          },
          reject: () => {
          }
        });
  }
}




















