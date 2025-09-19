
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CountryService } from 'src/app/masters/countries/countries.service';
import { StateService } from 'src/app/masters/states/states.service';
import { CityService } from 'src/app/masters/cities/city.service';
import { ItemService } from '../item-service';
import { ChartOfAccountService } from 'src/app/financial/coa/coa-service';
import { UomService } from '../../uom/uom/uom-service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  itemId: any;
  accountHeads: any;
  parentHeadList:any;
  uomList: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
    private itemService : ItemService,
    private chartOfAccountService : ChartOfAccountService,
    private uomService: UomService,
  ) {
  
  }

  ngOnInit() {
      this.loadAccountHeads();
      this.getUomList()
      this.addForm = this.fb.group({
        itemCode: [null, Validators.required],
        itemName: [null, Validators.required],
        uomId:[null, Validators.required],
        budgetLineId:[null,Validators.required],
    
      }); 
      
      this.route.paramMap.subscribe((params:any) => {
        this.itemId = parseInt(params.get('id'));

        if (this.itemId) {
          this.isEditMode = true;
          this.itemService.getItemById(this.itemId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              itemCode: [data.itemCode, Validators.required],
              itemName: [data.itemName, Validators.required],
              uomId:[data.uomId,Validators.required],
              budgetLineId:[data.budgetLineId,Validators.required],
            });
          }); 
          
        } else {
          this.isEditMode = false;
        }
      });

      
  }

  getUomList(){
    this.uomService.getUom().subscribe((data :any) => {
            this.uomList = data
      });
  }

  onUomChange(event:any){

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
  onChangeBudgetLine(event:any){
    
  }
 
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowed = /[0-9.]/
    if (!allowed.test(event.key)) {
      event.preventDefault();
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/item');
  }

  cancel() {
    this.router.navigateByUrl('masters/item');
  }

   onSubmit() {    
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.itemService.insertItem(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Item Details saved successfully")
      this.router.navigateByUrl('masters/item');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.itemService.updateItem(Number(this.itemId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Item Details updated successfully")
      this.router.navigateByUrl('masters/item');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  } 
}





















