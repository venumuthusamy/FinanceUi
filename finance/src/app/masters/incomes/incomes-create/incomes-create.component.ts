import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { IncomeService } from '../incomes-service';



@Component({
  selector: 'app-incomes-create',
  templateUrl: './incomes-create.component.html',
  styleUrls: ['./incomes-create.component.css'],
  providers: [DatePipe],
})
export class IncomesCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  incomeId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private incomeService: IncomeService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.incomeId = parseInt(params.get('id'));
        if (this.incomeId) {
          this.isEditMode = true;
          this.incomeService.getIncomeById(this.incomeId).subscribe((data :any) => {
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
      this.incomeService.insertIncome(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Income saved successfully")
      this.router.navigateByUrl('masters/incomes');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.incomeService.updateIncome(Number(this.incomeId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Income updated successfully")
      this.router.navigateByUrl('masters/incomes');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/incomes');
  }

  cancel() {
  this.router.navigateByUrl('masters/incomes');
  }
}











