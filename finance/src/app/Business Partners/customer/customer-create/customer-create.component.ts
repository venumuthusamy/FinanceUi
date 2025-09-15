import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CustomerService } from '../customer-service';
import { CountryService } from 'src/app/masters/countries/countries.service';
import { StateService } from 'src/app/masters/states/states.service';
import { CityService } from 'src/app/masters/cities/city.service';
import { CustomerGroupsService } from 'src/app/masters/customergroups/customergroups.service';
import { RegionService } from 'src/app/masters/regions/regions.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {

  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  customerId: any;
  countryList: any;
  stateList: any;
  cityList: any;
  customerGroupsList: any;
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
    private customerService : CustomerService,
    private cityService: CityService,
    private customerGroupsService : CustomerGroupsService,
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
        customerGroupId:[null,Validators.required],
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
      this.getCustomerGroup()
      this.getRegion()
      
      this.route.paramMap.subscribe((params:any) => {
        this.customerId = parseInt(params.get('id'));

        if (this.customerId) {
          this.isEditMode = true;
          this.customerService.getCustomerById(this.customerId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              name: [data.name, Validators.required],
              contactName:[data.contactName],
              countryId:[data.countryId,Validators.required],
              stateId:[data.stateId,Validators.required],
              cityId:[data.cityId,Validators.required],
              customerGroupId:[data.customerGroupId,Validators.required],
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

  getCustomerGroup(){
     this.customerGroupsService.getCustomerGroups().subscribe((data :any) => {
            this.customerGroupsList = data
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
      this.customerService.insertCustomer(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Customer Details saved successfully")
      this.router.navigateByUrl('bp/customer');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.customerService.updateCustomer(Number(this.customerId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Customer Details updated successfully")
      this.router.navigateByUrl('bp/customer');
      },(err)=>{
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
    this.router.navigateByUrl('bp/customer');
  }

  cancel() {
    this.router.navigateByUrl('bp/customer');
  }
}












