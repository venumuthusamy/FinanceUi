import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CountryService } from 'src/app/masters/countries/countries.service';
import { StateService } from 'src/app/masters/states/states.service';
import { CityService } from 'src/app/masters/cities/city.service';
import { LocationService } from '../location-service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  locationId: any;
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
    private locationService : LocationService,
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
        latitude:[null],
        longitude:[null],
    
      });

      this.getCountry()
      this.getState()
      this.getCity()     
      
      this.route.paramMap.subscribe((params:any) => {
        this.locationId = parseInt(params.get('id'));

        if (this.locationId) {
          this.isEditMode = true;
          this.locationService.getLocationById(this.locationId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              name: [data.name, Validators.required],
              countryId:[data.countryId],
              stateId:[data.stateId],
              cityId:[data.cityId],
              address:[data.address],
              latitude:[data.latitude],
              longitude:[data.longitude],
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
      this.locationService.insertLocation(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Location Details saved successfully")
      this.router.navigateByUrl('masters/locations');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.locationService.updateLocation(Number(this.locationId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Location Details updated successfully")
      this.router.navigateByUrl('masters/locations');
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
    this.router.navigateByUrl('masters/locations');
  }

  cancel() {
    this.router.navigateByUrl('masters/locations');
  }
}














