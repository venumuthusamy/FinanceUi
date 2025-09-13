import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { JournalVoucherService } from '../journal-voucher-service';

@Component({
  selector: 'app-journal-voucher-create',
  templateUrl: './journal-voucher-create.component.html',
  styleUrls: ['./journal-voucher-create.component.css'],
  providers: [DatePipe],
})
export class JournalVoucherCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  journalVoucherId: any;
  accountList:any = [{id:1,name:"Cash In Hand"},{id:2,name:"Cash At Bank"}]

  constructor(
    private fb: FormBuilder,
    private journalVoucherService: JournalVoucherService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  
  }
  

  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
        this.journalVoucherId = parseInt(params.get('id'));
        if (this.journalVoucherId) {
          this.isEditMode = true;
          this.journalVoucherService.getJournalVoucherById(this.journalVoucherId).subscribe((data :any) => {
            this.addForm = this.fb.group({            
              date: new Date(data.date),              
              accountId:[data.accountId],            
              debit: [data.debit],
              credit: [data.credit],
              remark: [data.remark],
            });
          }); 
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
          date: [new Date(),Validators.required],          
          accountId:[null,Validators.required],
          debit: [0.00,Validators.required],
          credit: [0.00,Validators.required],         
          remark: [null,Validators.required]
      });
    
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.journalVoucherService.insertJournalVoucher(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance saved successfully")
      this.router.navigateByUrl('financial/journalvoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }else{
      this.journalVoucherService.updateJournalVoucher(Number(this.journalVoucherId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance updated successfully")
      this.router.navigateByUrl('financial/journalvoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }
    }
  }
  backButton() {
    this.router.navigateByUrl('financial/journalvoucher');
  }
  cancel() {
    this.router.navigateByUrl('financial/journalvoucher');
  }

}




























