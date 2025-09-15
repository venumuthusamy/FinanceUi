import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { DeductionService } from '../deductions-service';

@Component({
  selector: 'app-deductions-create',
  templateUrl: './deductions-create.component.html',
  styleUrls: ['./deductions-create.component.css'],
  providers: [DatePipe],
})
export class DeductionsCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  deductionId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private deductionService: DeductionService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.deductionId = parseInt(params.get('id'));
        if (this.deductionId) {
          this.isEditMode = true;
          this.deductionService.getDeductionById(this.deductionId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              name: [data.name, Validators.required],
              description: [data.description],
            });
          }); 
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
        name: [null, Validators.required],
        description: [null,],
      });
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.deductionService.insertDeduction(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Deduction saved successfully")
      this.router.navigateByUrl('masters/deductions');
      },(err)=>{
          this.toast.showApiError(err)
      }); 
      }else{
      this.deductionService.updateDeduction(Number(this.deductionId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Deduction updated successfully")
      this.router.navigateByUrl('masters/deductions');
      },(err)=>{
          this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/deductions');
  }
  
  cancel() {
    this.router.navigateByUrl('masters/deductions');
  }
}











