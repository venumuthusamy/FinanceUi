import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { OpeningBalanceService } from '../opening-balance.service';
import { ChartOfAccountService } from '../../coa/coa-service';
import { AccountTypeList } from 'src/shared/accountType';

@Component({
  selector: 'app-opening-balance-create',
  templateUrl: './opening-balance-create.component.html',
  styleUrls: ['./opening-balance-create.component.css'],
  providers: [DatePipe],
})
export class OpeningBalanceCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  openingBalanceId: any;
  accountHeadList:any;
  balanceTypeList = AccountTypeList;
  openingBalanceList: any;

  constructor(
    private fb: FormBuilder,
    private openingBalanceService: OpeningBalanceService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private chartOfAccountService : ChartOfAccountService,
    private datePipe: DatePipe,
    private router : Router,
  ) {
  
  }

  ngOnInit() {
    this.loadAccountHeads();   
    this.openingBalanceService.getOpeningBalance().subscribe((data :any) => {
      this.openingBalanceList = data
    });     
    this.addForm = this.fb.group({
        id:[0],
        date:[new Date(),Validators.required],
        accountHeadId:[null,Validators.required],
        balanceType:[null,Validators.required],
        amount:[null,Validators.required],
        remark: [null,Validators.required]        
    });
  }

  loadAccountHeads() {
  this.chartOfAccountService.getChartOfAccount().subscribe((data) => {
    this.accountHeadList = data;
  });
  }

  onChangeAccountHead(event:any){
   let filterData = this.openingBalanceList.filter((data:any)=>{
    return data.accountHeadId == event.value
   })
   this.openingBalanceId = filterData[0].id
    if (this.openingBalanceId){
      this.isEditMode = true;           
    }else {
      this.isEditMode = false;
    }
  }
  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    const DateStr = this.addForm.value.date;

    if (typeof DateStr === 'string') {
      const [day, month, year] = DateStr.split("-");
      // Create date in UTC to avoid timezone shift
      const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
      if (!isNaN(date.getTime())) {
        rawValue.date = date.toISOString();
      }
    } 
    else if (DateStr instanceof Date) {
      // Ensure we store as UTC midnight
      const date = new Date(Date.UTC(DateStr.getFullYear(), DateStr.getMonth(), DateStr.getDate()));
      rawValue.date = date.toISOString();
    }
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.openingBalanceService.insertOpeningBalance(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance saved successfully")
      this.router.navigateByUrl('financial/coa')
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }else{
      this.openingBalanceService.updateOpeningBalance(Number(this.openingBalanceId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("OpeningBalance updated successfully")
      this.router.navigateByUrl('financial/coa')
      },(err)=>{
      this.toast.showError(err.error)
      }); 
      }
    }
  }
}















