import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { TaxServices } from '../service-service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent {
  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  serviceId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
     private taxServices : TaxServices,
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.serviceId = parseInt(params.get('id'));
        if (this.serviceId) {
          this.isEditMode = true;
          this.taxServices.getServicesById(this.serviceId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              name: [data.name, Validators.required],
              charge: [data.charge, Validators.required],
              tax: [data.tax, Validators.required],
              description:[data.description]
            });
          });           
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
        name: [null, Validators.required],
        charge: [null, Validators.required],
        tax: [null, Validators.required],
        description: [null]
      });
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.taxServices.insertServices(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Service saved successfully")
      this.router.navigateByUrl('masters/service');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.taxServices.updateServices(Number(this.serviceId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Service updated successfully")
      this.router.navigateByUrl('masters/service');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/service');
  }
  cancel() {
    this.router.navigateByUrl('masters/service');
  }
}



















