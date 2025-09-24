import { Component } from '@angular/core';
import { FlagIssuesService } from './flag-issues.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-flag-issues',
  templateUrl: './flag-issues.component.html',
  styleUrls: ['./flag-issues.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class FlagIssuesComponent {

  flagIssuesList: any;
   addForm!: FormGroup;     
showForm = false; 
isEditMode = false; 
  selectedFlagIssues: any = null;  

  constructor( private flagIssuesService: FlagIssuesService,
     private fb: FormBuilder,
      private toast: ToastService,
      private confirmationService: ConfirmationService){}


  ngOnInit(): void {
          this.addForm = this.fb.group({
            flagIssuesName: ['', Validators.required]
          });
      
          this.loadFlagIssues();
        }

  
    loadFlagIssues() {
    debugger
    this.flagIssuesService.getFlagIssues().subscribe((data :any) => {
            this.flagIssuesList = data
      });
  }

   createFlagIssues() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedFlagIssues = null;
    this.addForm.reset();
  }

    editFlagISsues(FlagIssues: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedFlagIssues = FlagIssues;
    this.addForm.patchValue({
      flagIssuesNames: FlagIssues.flagIssuesName
    });
  }

    cancel() {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedFlagIssues = null;
    this.addForm.reset();
  }

   // Save or update
 onSubmit() {
  debugger;
  if (this.addForm.invalid) {
    this.toast.showWarning('Please fill all required fields');
    return;
  }

  if (this.isEditMode) {
    // Update existing record
    const updatedFlagIssues = {
      ...this.selectedFlagIssues,
      ...this.addForm.value,
      UpdatedBy: 1,                // Hardcoded user ID, replace as needed
      UpdatedDate: new Date()       // Current date/time
    };

    this.flagIssuesService.updateFlagIssues(this.selectedFlagIssues.id, updatedFlagIssues).subscribe({
      next: () => {
        this.toast.showSuccess('FlagIssues updated successfully');
        this.loadFlagIssues();
        this.cancel();
      },
      error: (err) => {
        console.error(err);
        this.toast.showApiError('Failed to update FlagIssues');
      }
    });

  } else {
    // Create new record
    const payload = {
      flagIssuesNames: this.addForm.get('flagIssuesName')?.value,
      createdBy: 1,               
      updatedBy: 1,
      createdDate: new Date(),
      updatedDate: new Date(),
       IsActive: true
    };

    this.flagIssuesService.insertFlagIssues(payload).subscribe({
      next: () => {
        this.toast.showSuccess('FlagIssues created successfully');
        this.loadFlagIssues();
        this.cancel();
      },
      error: (err) => {
        console.error(err);
        this.toast.showApiError('Failed to create FlagIssues');
      }
    });
  }
}



   // Delete
  confirmFlagIssues(flagIssues: any) {
 
       this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteFlagIssues(flagIssues);
          },
          reject: () => {
          }
        });
    
  }
   // Delete
  deleteFlagIssues(item : any){
    this.flagIssuesService.deleteFlagIssues(item.id).subscribe((res)=>{
      this.toast.showSuccess("FlagIssues Details deleted successfully")
      this.isEditMode = false;
       this.showForm = false;
      this.ngOnInit()  
    })
  }
}
