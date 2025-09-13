import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CountryService } from 'src/app/masters/countries/countries.service';
import { StateService } from 'src/app/masters/states/states.service';
import { CityService } from 'src/app/masters/cities/city.service';
import { WarehouseService } from '../warehouses-service';

@Component({
  selector: 'app-warehouses-create',
  templateUrl: './warehouses-create.component.html',
  styleUrls: ['./warehouses-create.component.css']
})
export class WarehousesCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  warehouseId: any;
  countryList: any;
  stateList: any;
  cityList: any;
  stateUpdatedList: any;
  cityUpdatedList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private countryService : CountryService,
    private warehouseService : WarehouseService,
    private cityService: CityService,
  ) {
  
  }

  ngOnInit() {

      this.addForm = this.fb.group({
        name: [null, Validators.required],
        countryId:[null,Validators.required],
        stateId:[null,Validators.required],
        cityId:[null,Validators.required],
        address:[null],
        phone:[null,Validators.required],
        description:[null],
    
      });

      this.getCountry()
      this.getState()
      this.getCity()     
      
      this.route.paramMap.subscribe((params:any) => {
        this.warehouseId = parseInt(params.get('id'));

        if (this.warehouseId) {
          this.isEditMode = true;
          this.warehouseService.getWarehouseById(this.warehouseId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              name: [data.name, Validators.required],
              countryId:[data.countryId,Validators.required],
              stateId:[data.stateId,Validators.required],
              cityId:[data.cityId,Validators.required],
              phone:[data.phone,Validators.required],
              address:[data.address],
              description:[data.description],
            });
            this.onCountryChange({ value: data.countryId,stateId: data.stateId },true)
            this.onStateChange({ value: data.stateId,cityId: data.cityId },true)
          }); 
          
        } else {
          this.isEditMode = false;
        }
      });

      
  }

  getCountry(){
   this.countryService.getCountry().subscribe((data :any) => {
            this.countryList = data
    }); 
  }
   getState(){
   this.stateService.getState().subscribe((data :any) => {
            this.stateList = data
    }); 
  }

  getCity(){
     this.cityService.getCity().subscribe((data :any) => {
            this.cityList = data
      }); 
  }

  onCountryChange(event:any,isEdit: boolean = false){
   this.cityUpdatedList =  [] 
   this.stateUpdatedList = this.stateList?.filter((s: any) => s.countryId === event.value);
    if (isEdit) {
    const matchedState = this.stateUpdatedList?.find((s: any) => s.stateId === event.stateId);
        this.addForm.patchValue({
        stateId : matchedState?.stateId
        })
    } else {
    this.addForm.patchValue({ stateId: null,cityId: null });
    }
 
  }
  onStateChange(event:any,isEdit: boolean = false){
    this.cityUpdatedList = this.cityList?.filter((s: any) => s.stateId === event.value);
    if (isEdit) {
    const matchedCity = this.cityUpdatedList?.find((s: any) => s.cityId === event.cityId);
        this.addForm.patchValue({
        cityId : matchedCity?.cityId
        })
    } else {
    this.addForm.patchValue({ cityId: null });
    }
  }
  onSubmit() {    
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.warehouseService.insertWarehouse(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Warehouses Details saved successfully")
      this.router.navigateByUrl('masters/warehouses');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.warehouseService.updateWarehouse(Number(this.warehouseId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Warehouses Details updated successfully")
      this.router.navigateByUrl('masters/warehouses');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  } 

  allowOnlyNumbers(event: KeyboardEvent) {
    const allowed = /[0-9.]/
    if (!allowed.test(event.key)) {
      event.preventDefault();
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/warehouses');
  }

  cancel() {
    this.router.navigateByUrl('masters/warehouses');
  }
}

















