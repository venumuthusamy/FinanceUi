import { Component } from '@angular/core';
import { IncotermsService } from './incoterms.service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-incoterms',
  templateUrl: './incoterms.component.html',
  styleUrls: ['./incoterms.component.css'],
  providers:[ConfirmationService, MessageService]
})
export class IncotermsComponent {
  incotermList: any;
   addForm!: FormGroup;     
showForm = false; 
isEditMode = false; 
  selectedIncoterms: any = null;   

  constructor( private incotermsService: IncotermsService,
     private fb: FormBuilder,
      private toast: ToastService,
      private confirmationService: ConfirmationService){}

      ngOnInit(): void {
          this.addForm = this.fb.group({
            incotermsName: ['', Validators.required]
          });
      
          this.loadIncoterms();
        }

    loadIncoterms() {
    debugger
    this.incotermsService.getIncoterms().subscribe((data :any) => {
            this.incotermList = data
      });
  }

   createIncoterms() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedIncoterms = null;
    this.addForm.reset();
  }

    editIncoterms(incoterms: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedIncoterms = incoterms;
    this.addForm.patchValue({
      incotermsName: incoterms.incotermsName
    });
  }

    cancel() {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedIncoterms = null;
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
    const updatedIncoterms = {
      ...this.selectedIncoterms,
      ...this.addForm.value,
      UpdatedBy: 1,                // Hardcoded user ID, replace as needed
      UpdatedDate: new Date()       // Current date/time
    };

    this.incotermsService.updateIncoterms(this.selectedIncoterms.id, updatedIncoterms).subscribe({
      next: () => {
        this.toast.showSuccess('Incoterms updated successfully');
        this.loadIncoterms();
        this.cancel();
      },
      error: (err) => {
        console.error(err);
        this.toast.showApiError('Failed to update Incoterms');
      }
    });

  } else {
    // Create new record
    const payload = {
      IncotermsName: this.addForm.get('incotermsName')?.value,
      createdBy: 1,                // Hardcoded user ID, replace as needed
      updatedBy: 1,
      createdDate: new Date(),
      updatedDate: new Date(),
       IsActive: true
    };

    this.incotermsService.insertIncoterms(payload).subscribe({
      next: () => {
        this.toast.showSuccess('Incoterms created successfully');
        this.loadIncoterms();
        this.cancel();
      },
      error: (err) => {
        console.error(err);
        this.toast.showApiError('Failed to create Incoterms');
      }
    });
  }
}



   // Delete
  confirmdeleteIncoterms(incoterms: any) {
 
       this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteIncoterms(incoterms);
          },
          reject: () => {
          }
        });
    
  }
   // Delete
  deleteIncoterms(item : any){
    this.incotermsService.deleteIncoterms(item.id).subscribe((res)=>{
      this.toast.showSuccess("Incoterms Details deleted successfully")
      this.isEditMode = false;
       this.showForm = false;
      this.ngOnInit()  
    })
  }
}
