import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentTermsService } from './paymentterms.service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
   selector: 'app-paymentterms',
  templateUrl: './paymentterms.component.html',
  styleUrls: ['./paymentterms.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class PaymentTermsComponent {
  paymentTermsList: any[] = [];
  addForm!: FormGroup;
  showForm = false;
  isEditMode = false;
  selectedPaymentTerm: any = null;

  constructor(
    private fb: FormBuilder,
    private paymentTermsService: PaymentTermsService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      paymentTermsName: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: ['1'],   
      updatedBy: ['1']  
    });

    this.loadPaymentTerms();
  }

  // Load data
  loadPaymentTerms() {
    this.paymentTermsService.getAll().subscribe((res: any) => {
      this.paymentTermsList = res.data;
    });
  }

  // Show form for creating
  createPaymentTerm() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedPaymentTerm = null;
    this.addForm.reset();
  }

  // Show form for editing
  editPaymentTerm(data: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedPaymentTerm = data;
    this.addForm.patchValue({
      paymentTermsName: data.paymentTermsName,
      description: data.description,
    });
  }

  // Cancel and hide form
  cancel() {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedPaymentTerm = null;
    this.addForm.reset();
  }

  // Save or update
  onSubmit() {
    const payload = {
      PaymentTermsName: this.addForm.value.paymentTermsName,
      Description: this.addForm.value.description,
      CreatedBy: '1',
      UpdatedBy: '1',
      IsActive: true
    };

    if (this.addForm.invalid) {
      this.toast.showWarning('Please fill all required fields');
      return;
    }

    if (this.isEditMode) {
      this.paymentTermsService.update(this.selectedPaymentTerm.id, payload).subscribe({
        next: () => {
          this.toast.showSuccess('Payment term updated successfully');
          this.loadPaymentTerms();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to update Payment term')
      });
    } else {
      this.paymentTermsService.create(payload).subscribe({
        next: () => {
          this.toast.showSuccess('Payment term created successfully');
          this.loadPaymentTerms();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to create Payment term')
      });
    }
  }

  // Confirm delete
  confirmDeletePaymentTerm(data: any) {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => this.deletePaymentTerm(data),
      reject: () => {}
    });
  }

  // Delete
  deletePaymentTerm(item: any) {
    this.paymentTermsService.delete(item.id).subscribe(() => {
      this.toast.showSuccess('Payment term deleted successfully');
      this.ngOnInit();
    });
  }
}
