import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CustomerGroupsService } from '../customergroups.service';

@Component({
  selector: 'app-customergroups-create',
  templateUrl: './customergroups-create.component.html',
  styleUrls: ['./customergroups-create.component.css']
})
export class CustomergroupsCreateComponent {

  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  customerGroupId: any;
  countryList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
     private customerGroupsService : CustomerGroupsService,
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.customerGroupId = parseInt(params.get('id'));
        if (this.customerGroupId) {
          this.isEditMode = true;
          this.customerGroupsService.getCustomerGroupsById(this.customerGroupId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              name: [data.name, Validators.required],
              description:[data.description]
            });
          });           
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
        name: [null, Validators.required],
        description: [null,Validators.required]
      });
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.customerGroupsService.insertCustomerGroups(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Customer Groups saved successfully")
      this.router.navigateByUrl('masters/customergroups');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.customerGroupsService.updateCustomerGroups(Number(this.customerGroupId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Customer Groups updated successfully")
      this.router.navigateByUrl('masters/customergroups');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/customergroups');
  }
  cancel() {
    this.router.navigateByUrl('masters/customergroups');
  }
}













