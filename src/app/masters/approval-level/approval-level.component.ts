import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovalLevelService } from './approval-level.service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-approval-level',
  templateUrl: './approval-level.component.html',
  styleUrls: ['./approval-level.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ApprovalLevelComponent {
 approvalLevelList: any[] = []; 
  addForm!: FormGroup;        
  showForm = false;          
  isEditMode = false;       
  selectedUom: any = null;   

  constructor(
    private fb: FormBuilder,
    private approvalLevelService: ApprovalLevelService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: [1],   
      updatedBy: [1]  
    });

    this.loadApprovalLevel();
  }

  // Load data from API
  loadApprovalLevel() {
    debugger
    this.approvalLevelService.getAll().subscribe((res :any) => {
            this.approvalLevelList = res.data
      });
  }

  // Show form for creating
  createApprovalLevel() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedUom = null;
    this.addForm.reset();
  }

  // Show form for editing
  editApprovalLevel(data: any) {
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
  const payload = {
  Name: this.addForm.value.name,          
  Description: this.addForm.value.description,
  CreatedBy: '1',                         
  UpdatedBy: '1',                         
  IsActive: true                          
};
    debugger
    if (this.addForm.invalid) {
      this.toast.showWarning('Please fill all required fields');
      return;
    }

    if (this.isEditMode) {
      this.approvalLevelService.update(this.selectedUom.id, payload).subscribe({
    next: () => {
      this.toast.showSuccess('Approvallevel updated successfully');
      this.loadApprovalLevel();
      this.cancel();
    },
    error: () => this.toast.showApiError('Failed to update Uom')
  });
    } else {
      this.approvalLevelService.create(payload).subscribe({
        next: () => {
          this.toast.showSuccess('Approvallevel created successfully');
          this.loadApprovalLevel();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to create Uom')
      });
    }
  }

  // Delete
  confirmdeleteApprovalLevel(data: any) {
 
       this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteApprovalLevel(data);
          },
          reject: () => {
          }
        });
    
  }
   // Delete
  deleteApprovalLevel(item : any){
    this.approvalLevelService.delete(item.id).subscribe((res)=>{
      this.toast.showSuccess("Approvallevel  deleted successfully")
      this.ngOnInit()  
    })
  }
}
