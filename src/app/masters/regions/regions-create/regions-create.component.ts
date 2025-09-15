import { Component} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { RegionService } from '../regions.service';

@Component({
  selector: 'app-regions-create',
  templateUrl: './regions-create.component.html',
  styleUrls: ['./regions-create.component.css'],
  providers: [DatePipe] 
})
export class RegionsCreateComponent {

  addForm!: FormGroup;
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  editIndex: number | null = null;
  isEditMode = false;
  regionId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private regionService: RegionService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
  
  }

  ngOnInit() {
      this.route.paramMap.subscribe((params:any) => {
        this.regionId = parseInt(params.get('id'));
        if (this.regionId) {
          this.isEditMode = true;
          this.regionService.getRegionById(this.regionId).subscribe((data :any) => {
            this.addForm = this.fb.group({
              regionName: [data.regionName, Validators.required],
            });
          });           
        } else {
          this.isEditMode = false;
        }
      });
      this.addForm = this.fb.group({
        regionName: [null, Validators.required],
      });
  }

  onSubmit() {
    const rawValue = this.addForm.getRawValue()
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      if(!this.isEditMode){
      this.regionService.insertRegion(rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Region saved successfully")
      this.router.navigateByUrl('masters/regions');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }else{
      this.regionService.updateRegion(Number(this.regionId),rawValue).subscribe((res :any) => {
      this.toast.showSuccess("Region updated successfully")
      this.router.navigateByUrl('masters/regions');
      },(err)=>{
      this.toast.showApiError(err)
      }); 
      }
    }
  }
  backButton() {
    this.router.navigateByUrl('masters/regions');
  }
  cancel() {
    this.router.navigateByUrl('masters/regions');
  }
}











