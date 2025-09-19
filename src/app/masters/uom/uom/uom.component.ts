import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UomService } from './uom-service';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UomComponent {
  uomList: any[] = []; 
  addForm!: FormGroup;        
  showForm = false;          
  isEditMode = false;       
  selectedUom: any = null;   

  constructor(
    private fb: FormBuilder,
    private uomService: UomService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.loadUom();
  }

  // Load data from API
  loadUom() {
    debugger
    this.uomService.getUom().subscribe((data :any) => {
            this.uomList = data
      });
  }

  // Show form for creating
  createUom() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedUom = null;
    this.addForm.reset();
  }

  // Show form for editing
  editUom(data: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedUom = data;
    this.addForm.patchValue({
      name: data.name,
      description: data.description,
    });
  }

  // Cancel and hide form
  cancel() {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedUom = null;
    this.addForm.reset();
  }

  // Save or update
  onSubmit() {
    debugger
    if (this.addForm.invalid) {
      this.toast.showWarning('Please fill all required fields');
      return;
    }

    if (this.isEditMode) {
      const updatedUom = { ...this.selectedUom, ...this.addForm.value };
      this.uomService.updateUom(this.selectedUom.id, updatedUom).subscribe({
        next: () => {
          this.toast.showSuccess('Uom updated successfully');
          this.loadUom();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to update Uom')
      });
    } else {
      this.uomService.insertUom(this.addForm.value).subscribe({
        next: () => {
          this.toast.showSuccess('Uom created successfully');
          this.loadUom();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to create Uom')
      });
    }
  }

  // Delete
  confirmdeleteUom(data: any) {
 
       this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteUom(data);
          },
          reject: () => {
          }
        });
    
  }
   // Delete
  deleteUom(item : any){
    this.uomService.deleteUom(item.id).subscribe((res)=>{
      this.toast.showSuccess("Uom Details deleted successfully")
      this.ngOnInit()  
    })
  }
}





