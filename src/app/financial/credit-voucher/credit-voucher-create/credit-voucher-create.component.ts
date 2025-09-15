import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CreditVoucherService } from '../credit-voucher-service';

@Component({
  selector: 'app-credit-voucher-create',
  templateUrl: './credit-voucher-create.component.html',
  styleUrls: ['./credit-voucher-create.component.css'],
  providers: [DatePipe],
})
export class CreditVoucherCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  creditVoucherId: any;
  debitAccountHeadList:any = [{id:1,name:"Cash In Hand"},{id:2,name:"Cash At Bank"}]
  accountList:any = [{id:1,name:"Cash In Hand"},{id:2,name:"Cash At Bank"}]

  constructor(
    private fb: FormBuilder,
    private creditVoucherService: CreditVoucherService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  
  }
  

  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
        this.creditVoucherId = parseInt(params.get('id'));
        if (this.creditVoucherId) {
          this.isEditMode = true;
          this.creditVoucherService.getCreditVoucherById(this.creditVoucherId).subscribe((data :any) => {
            this.addForm = this.fb.group({            
              date: new Date(data.date),
              debitAccountHeadId:[data.debitAccountHeadId],
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
          debitAccountHeadId:[null,Validators.required],
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
      this.creditVoucherService.insertCreditVoucher(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance saved successfully")
      this.router.navigateByUrl('financial/creditvoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }else{
      this.creditVoucherService.updateCreditVoucher(Number(this.creditVoucherId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance updated successfully")
      this.router.navigateByUrl('financial/creditvoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }
    }
  }
  backButton() {
    this.router.navigateByUrl('financial/creditvoucher');
  }
  cancel() {
    this.router.navigateByUrl('financial/creditvoucher');
  }
}




















