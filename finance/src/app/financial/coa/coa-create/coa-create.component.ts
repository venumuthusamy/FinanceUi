import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { StateService } from 'src/app/masters/states/states.service';
import { ChartOfAccountService } from '../coa-service';

@Component({
  selector: 'app-coa-create',
  templateUrl: './coa-create.component.html',
  styleUrls: ['./coa-create.component.css']
})
export class CoaCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  chartOfAccountId: any;
  parentHeadList:any
  accountHeads: any;
  selectedParentHeadLabel: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private chartOfAccountService : ChartOfAccountService,
  ) {
  
  }

  ngOnInit() {
      this.loadAccountHeads();
      this.addForm = this.fb.group({
        headName: [null, Validators.required],
        headCode:[{ value: null, disabled: true }],
        parentHead:[0],
        pHeadName:[{ value: null, disabled: true }],
        headLevel:[{ value: null, disabled: true }],
        headType:[{ value: null, disabled: true }],
        isTransaction:[false],
        isGI:[false],
        headCodeName:[null]
      });
      
      this.route.paramMap.subscribe((params:any) => {
        this.chartOfAccountId = parseInt(params.get('id'));

        if (this.chartOfAccountId) {
          this.isEditMode = true;
          this.chartOfAccountService.getChartOfAccountById(this.chartOfAccountId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              headName: [data.headName, Validators.required],
              headCode:[{ value: data.headCode, disabled: true }],
              parentHead:[{ value: data.parentHead, disabled: true }],
              pHeadName:[{ value: data.pHeadName, disabled: true }],
              headLevel:[{ value: data.headLevel, disabled: true }],
              headType:[{ value: data.headType, disabled: true }],
              isTransaction:[data.isTransaction],
              isGI:[data.isGI],
              headCodeName:[data.headCodeName]
            });

             const selected = this.parentHeadList.find((x:any) => x.value === this.addForm.get('parentHead')?.value);
             this.selectedParentHeadLabel = selected ? selected.label : '';
          }); 
          
        } else {
          this.isEditMode = false;
        }
      });
  }

  loadAccountHeads() {
  this.chartOfAccountService.getChartOfAccount().subscribe((data) => {
    this.accountHeads = data;
    this.parentHeadList = this.accountHeads.map((head:any)=> ({
      value: head.id,
      label: this.buildFullPath(head)
    }));
  });
  }

  buildFullPath(item:any): string {
    let path = item.headName;
    let current = this.accountHeads.find((x:any) => x.id === item.parentHead);
    while (current) {
      path = `${current.headName} >> ${path}`;
      current = this.accountHeads.find((x:any) => x.id === current.parentHead);
    }
    return path;
  }

  onChangeHeadName(event:any){
    this.chartOfAccountService.getChartOfAccount().subscribe(res=>{

        if (res && res.length > 0) {
        const Items = res.filter((item:any)=>item.headLevel === 1)  
        const lastHeadCode = Items.length + 1;
        
        this.addForm.patchValue({
        headCode: lastHeadCode,
        pHeadName: "COA",
        headLevel: 1,
        headType: "A",
        isTransaction: false,
        isGI: false,
        headCodeName:null
        })
        }else{
        this.addForm.patchValue({
        headCode: 1,
        pHeadName: "COA",
        headLevel: 1,
        headType: "A",
        isTransaction: false,
        isGI: false,
        headCodeName:null
        })
        }    
    })
    
  }
  onChangeParentHead(data:any){
    const selected = this.parentHeadList.find((x:any) => x.value === data.value);
    this.selectedParentHeadLabel = selected ? selected.label : '';
    
    const parent = this.accountHeads.find((p: any) => p.id === data.value);
    if (!parent) return;

    const parentCode = parent.headCode != null ? String(parent.headCode) : '';
    const parentLevel = Number(parent.headLevel);

    // map to safe string and level, filter children that belong to this parent level
    const childCodes = this.accountHeads
      .map((acc: any) => ({
        code: acc.headCode != null ? String(acc.headCode) : '',
        level: Number(acc.headLevel)
      }))
      .filter((c:any) => c.code.startsWith(parentCode) && c.level === parentLevel + 1)
      .map((c:any) => c.code);
      

    // compute numeric suffixes (part after parentCode)
    const suffixes = childCodes
      .map((code:any)=> {
        const s = code.substring(parentCode.length);
        // parseInt fallback to 0 if NaN
        return parseInt(s, 10) || 0;
      })
      .sort((a:number, b:number) => a - b);

    let nextSequence = 1;
    if (suffixes.length > 0) {
      nextSequence = suffixes[suffixes.length - 1] + 1;
    }

    // decide pad length: use max existing suffix length or default 2
    const maxSuffixLen = childCodes.reduce((max :any, c:any) => Math.max(max, c.length - parentCode.length), 2);
    const seqStr = String(nextSequence).padStart(maxSuffixLen, '0');

    const newHeadCode = parentCode + seqStr;

    // patch the form
    this.addForm.patchValue({
      pHeadName: parent.headName,
      headLevel: parent.headLevel + 1,
      headType: parent.headType,
      headCode: newHeadCode
    });
    
  }


  onSubmit() {   
    const rawValue = this.addForm.getRawValue()
    rawValue.parentHead = this.addForm.value.parentHead ? this.addForm.value.parentHead :0
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.chartOfAccountService.insertChartOfAccount(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("ChartOfAccount Details saved successfully")
      this.router.navigateByUrl('financial/coa');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.chartOfAccountService.updateChartOfAccount(Number(this.chartOfAccountId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("ChartOfAccount Details updated successfully")
      this.router.navigateByUrl('financial/coa');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  } 

  backButton() {
    this.router.navigateByUrl('financial/coa');
  }

  cancel() {
    this.router.navigateByUrl('financial/coa');
  }
}



















