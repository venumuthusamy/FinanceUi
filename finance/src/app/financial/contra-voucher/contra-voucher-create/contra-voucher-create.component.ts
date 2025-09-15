import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ContraVoucherService } from '../contra-voucher-service';

@Component({
  selector: 'app-contra-voucher-create',
  templateUrl: './contra-voucher-create.component.html',
  styleUrls: ['./contra-voucher-create.component.css'],
  providers: [DatePipe],
})
export class ContraVoucherCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  contraVoucherId: any;
  accountList:any = [{id:1,name:"Cash In Hand"},{id:2,name:"Cash At Bank"}]

  constructor(
    private fb: FormBuilder,
    private contraVoucherService: ContraVoucherService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  
  }
  

  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
        this.contraVoucherId = parseInt(params.get('id'));
        if (this.contraVoucherId) {
          this.isEditMode = true;
          this.contraVoucherService.getContraVoucherById(this.contraVoucherId).subscribe((data :any) => {
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
      this.contraVoucherService.insertContraVoucher(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance saved successfully")
      this.router.navigateByUrl('financial/contravoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }else{
      this.contraVoucherService.updateContraVoucher(Number(this.contraVoucherId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance updated successfully")
      this.router.navigateByUrl('financial/contravoucher');
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }
    }
  }
   backButton() {
    this.router.navigateByUrl('financial/contravoucher');
  }

   cancel() {
    this.router.navigateByUrl('financial/contravoucher');
  }
}























