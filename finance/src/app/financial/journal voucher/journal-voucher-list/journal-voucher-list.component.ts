import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JournalVoucherService } from '../journal-voucher-service';

@Component({
  selector: 'app-journal-voucher-list',
  templateUrl: './journal-voucher-list.component.html',
  styleUrls: ['./journal-voucher-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class JournalVoucherListComponent {
  headervalue: any
  journalVoucherList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  journalVoucherName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private journalVoucherService : JournalVoucherService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Journal Voucher';
     this.journalVoucherService.getJournalVoucher().subscribe((data :any) => {
            this.journalVoucherList = data
      });  
  }
  createJournalVoucher(){
    this.router.navigateByUrl('financial/journalvoucher/create')
  }
  editJournalVoucher(item : any){
    this.router.navigateByUrl(`financial/journalvoucher/edit/${item.id}`)
  }
  deleteJournalVoucher(item : any){
    this.journalVoucherService.deleteJournalVoucher(item.id).subscribe((res)=>{
      this.toast.showSuccess("Journal Voucher Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterJournalVoucher() {
    this.journalVoucherService.getJournalVoucher().subscribe((data :any) => {
        this.filteredList = data
        if (this.journalVoucherName) {
          this.filteredList = this.filteredList.filter((x: any) =>
            (!this.journalVoucherName || x.name.toLowerCase().includes(this.journalVoucherName.toLowerCase()))

          );
        }
        this.journalVoucherList = this.filteredList;
        this.page = 1;
     });
  }
  clearField(field: string) {
    if (field === 'journalVoucherName') {
      this.journalVoucherName = '';
    } 
    this.filterJournalVoucher();
  } 

  confirmdeleteJournalVoucher(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteJournalVoucher(item);
          },
          reject: () => {
          }
        });
  }
}
























