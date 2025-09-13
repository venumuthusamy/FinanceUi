import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { DebitVoucherService } from '../debit-voucher-service';

@Component({
  selector: 'app-debit-voucher-create',
  templateUrl: './debit-voucher-create.component.html',
  styleUrls: ['./debit-voucher-create.component.css'],
  providers: [DatePipe],
})
export class DebitVoucherCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  debitVoucherId: any;
  creditAccountHeadList:any = [{id:1,name:"Cash In Hand"},{id:2,name:"Cash At Bank"}]
  accountList:any = [{id:1,name:"Cash In Hand"},{id:2,name:"Cash At Bank"}]

  constructor(
    private fb: FormBuilder,
    private debitVoucherService: DebitVoucherService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  
  }
  

  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
        this.debitVoucherId = parseInt(params.get('id'));
        if (this.debitVoucherId) {
          this.isEditMode = true;
          this.debitVoucherService.getDebitVoucherById(this.debitVoucherId).subscribe((data :any) => {
            this.addForm = this.fb.group({            
              date: new Date(data.date),
              creditAccountHeadId:[data.creditAccountHeadId],
              accountId:[data.accountId],
              amount: [data.amount],
              remark: [data.remark]
            });
          }); 
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
          date: [new Date(),Validators.required],
          creditAccountHeadId:[null,Validators.required],
          accountId:[null,Validators.required],
          amount: [null,Validators.required],
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
      this.debitVoucherService.insertDebitVoucher(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance saved successfully")
      this.router.navigateByUrl('financial/debitvoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }else{
      this.debitVoucherService.updateDebitVoucher(Number(this.debitVoucherId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance updated successfully")
      this.router.navigateByUrl('financial/debitvoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }
    }
  }
  backButton() {
    this.router.navigateByUrl('financial/debitvoucher');
  }

  cancel() {
    this.router.navigateByUrl('financial/debitvoucher');
  } 
}


















