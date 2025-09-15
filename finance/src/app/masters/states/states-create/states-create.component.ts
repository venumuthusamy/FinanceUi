import { Component} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { StateService } from '../states.service';
import { CountryService } from '../../countries/countries.service';

@Component({
  selector: 'app-states-create',
  templateUrl: './states-create.component.html',
  styleUrls: ['./states-create.component.css'],
  providers: [DatePipe] 
})
export class StatesCreateComponent {

  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  stateId: any;
  countryList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stateService: StateService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute,
    private countryService : CountryService,
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.stateId = parseInt(params.get('id'));
        if (this.stateId) {
          this.isEditMode = true;
          this.stateService.getStateById(this.stateId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              stateName: [data.stateName, Validators.required],
              countryId:[data.countryId]
            });
          });           
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
        stateName: [null, Validators.required],
        countryId: [null,Validators.required]
      });
      this.getCountry()
  }

  getCountry(){
   this.countryService.getCountry().subscribe((data :any) => {
            this.countryList = data
    }); 
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.stateService.insertState(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("State saved successfully")
      this.router.navigateByUrl('masters/states');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.stateService.updateState(Number(this.stateId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("State updated successfully")
      this.router.navigateByUrl('masters/states');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/states');
  }
  cancel() {
    this.router.navigateByUrl('masters/states');
  }
}











