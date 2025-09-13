import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CountryService } from '../countries.service';

@Component({
  selector: 'app-countries-create',
  templateUrl: './countries-create.component.html',
  styleUrls: ['./countries-create.component.css'],
  providers: [DatePipe],
})
export class CountriesCreateComponent {

  
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  countryId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private countryService: CountryService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.countryId = parseInt(params.get('id'));
        if (this.countryId) {
          this.isEditMode = true;
          this.countryService.getCountryById(this.countryId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              countryName: [data.countryName, Validators.required],
            });
          }); 
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
        countryName: [null, Validators.required],
      });
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.countryService.insertCountry(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Country saved successfully")
      this.router.navigateByUrl('masters/countries');
      },(err)=>{
     this.toast.showApiError(err)
      }); 
      }else{
      this.countryService.updateCountry(Number(this.countryId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Country updated successfully")
      this.router.navigateByUrl('masters/countries');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/countries');
  }
  cancel(){
    this.router.navigateByUrl('masters/countries');
  }

}









