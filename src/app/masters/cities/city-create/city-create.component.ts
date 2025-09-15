import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CountryService } from '../../countries/countries.service';
import { CityService } from '../city.service';
import { StateService } from '../../states/states.service';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css'],
  providers: [DatePipe] 
})
export class CityCreateComponent {

  
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  cityId: any;
  countryList: any;
  stateList: any;
  stateUpdatedList: any[]=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute,
    private countryService : CountryService,
    private stateService: StateService,
  ) {
  
  }

  ngOnInit() {

     this.addForm = this.fb.group({
      cityName: [null, Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
    });
    this.getCountry()
    this.getState()

    this.route.paramMap.subscribe((params: any) => {
      this.cityId = parseInt(params.get('id'));
      if (this.cityId) {
        this.isEditMode = true;
        this.cityService.getCityById(this.cityId).subscribe((data: any) => {
          this.addForm.patchValue({
             cityName: data.cityName,
             countryId:data.countryId,
             //stateId: data.stateId,
          })
          this.onCountryChange({ value: data.countryId,stateId: data.stateId },true)
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

 onCountryChange(event:any,isEdit: boolean = false){
   this.stateUpdatedList = this.stateList.filter((s: any) => s.countryId === event.value);
    if (isEdit) {
    const matchedState = this.stateUpdatedList.find((s: any) => s.stateId === event.stateId);
        this.addForm.patchValue({
        stateId : matchedState.stateId
        })
    } else {
    this.addForm.patchValue({ stateId: null });
    }
 
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.cityService.insertCity(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("City saved successfully")
      this.router.navigateByUrl('masters/city');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.cityService.updateCity(Number(this.cityId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("City updated successfully")
      this.router.navigateByUrl('masters/city');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/city');
  }
  cancel() {
    this.router.navigateByUrl('masters/city');
  }
}













