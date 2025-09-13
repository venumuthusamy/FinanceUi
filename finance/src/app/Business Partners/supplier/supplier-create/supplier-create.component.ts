import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CountryService } from 'src/app/masters/countries/countries.service';
import { StateService } from 'src/app/masters/states/states.service';
import { CityService } from 'src/app/masters/cities/city.service';
import { RegionService } from 'src/app/masters/regions/regions.service';
import { SupplierService } from '../supplier-service';
import { SupplierGroupsService } from 'src/app/masters/suppliergroups/suppliergroups.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent {

  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  supplierId: any;
  countryList: any;
  stateList: any;
  cityList: any;
  supplierGroupsList: any;
  regionList: any;
  stateUpdatedList: any;
  cityUpdatedList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private countryService : CountryService,
    private supplierService : SupplierService,
    private cityService: CityService,
    private supplierGroupsService : SupplierGroupsService,
    private regionService : RegionService,
  ) {
  
  }

  ngOnInit() {

      this.addForm = this.fb.group({
        name: [null, Validators.required],
        contactName: [null],
        countryId:[null,Validators.required],
        stateId:[null,Validators.required],
        cityId:[null,Validators.required],
        supplierGroupId:[null,Validators.required],
        address:[null],
        regionId:[null,Validators.required],
        postalCode:[null],
        phone:[null,Validators.required],
        website:[null],
        fax:[null],
        email:[null],
      });

      this.getCountry()
      this.getState()
      this.getCity()
      this.getSupplierGroup()
      this.getRegion()
      
      this.route.paramMap.subscribe((params:any) => {
        this.supplierId = parseInt(params.get('id'));

        if (this.supplierId) {
          this.isEditMode = true;
          this.supplierService.getSupplierById(this.supplierId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              name: [data.name, Validators.required],
              contactName:[data.contactName],
              countryId:[data.countryId,Validators.required],
              stateId:[data.stateId,Validators.required],
              cityId:[data.cityId,Validators.required],
              supplierGroupId:[data.supplierGroupId,Validators.required],
              address:[data.address],
              regionId:[data.regionId,Validators.required],
              postalCode:[data.postalCode],
              phone:[data.phone, Validators.required],
              website:[data.website],
              fax:[data.fax],
              email:[data.email],
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

  getSupplierGroup(){
     this.supplierGroupsService.getSupplierGroups().subscribe((data :any) => {
            this.supplierGroupsList = data
      }); 
  }
  getRegion(){
    this.regionService.getRegion().subscribe((data :any) => {
            this.regionList = data
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
      this.supplierService.insertSupplier(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Supplier Details saved successfully")
      this.router.navigateByUrl('bp/supplier');
      },(err:any)=>{
     this.toast.showApiError(err)
      }); 
      }else{
      this.supplierService.updateSupplier(Number(this.supplierId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Supplier Details updated successfully")
      this.router.navigateByUrl('bp/supplier');
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
    this.router.navigateByUrl('bp/supplier');
  }

  cancel() {
    this.router.navigateByUrl('bp/supplier');
  }
}













