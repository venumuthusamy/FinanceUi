import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { SupplierGroupsService } from '../suppliergroups.service';

@Component({
  selector: 'app-suppliergroups-create',
  templateUrl: './suppliergroups-create.component.html',
  styleUrls: ['./suppliergroups-create.component.css']
})
export class SuppliergroupsCreateComponent {

  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  supplierGroupId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
     private supplierGroupsService : SupplierGroupsService,
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.supplierGroupId = parseInt(params.get('id'));
        if (this.supplierGroupId) {
          this.isEditMode = true;
          this.supplierGroupsService.getSupplierGroupsById(this.supplierGroupId).subscribe((data :any) => {
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
      this.supplierGroupsService.insertSupplierGroups(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Supplier Groups saved successfully")
      this.router.navigateByUrl('masters/suppliergroups');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.supplierGroupsService.updateSupplierGroups(Number(this.supplierGroupId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Supplier Groups updated successfully")
      this.router.navigateByUrl('masters/suppliergroups');
      },(err:any)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }

  backButton() {
    this.router.navigateByUrl('masters/suppliergroups');
  }

  cancel() {
    this.router.navigateByUrl('masters/suppliergroups');
  }
}















