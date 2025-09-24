import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from './currency.service';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CurrencyComponent {
  currencyList: any[] = [];
  addForm!: FormGroup;
  showForm = false;
  isEditMode = false;
  selectedCurrency: any = null;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      currencyName: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: ['1'],
      updatedBy: ['1']
    });

    this.loadCurrencies();
  }

  // Load all currencies
  loadCurrencies() {
    this.currencyService.getAll().subscribe((res: any) => {
      this.currencyList = res.data;
    });
  }

  // Show form for creating
  createCurrency() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedCurrency = null;
    this.addForm.reset();
  }

  // Show form for editing
  editCurrency(data: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedCurrency = data;
    this.addForm.patchValue({
      currencyName: data.currencyName,
      description: data.description
    });
  }

  // Cancel and hide form
  cancel() {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedCurrency = null;
    this.addForm.reset();
  }

  // Save or update
  onSubmit() {
    if (this.addForm.invalid) {
      this.toast.showWarning('Please fill all required fields');
      return;
    }

    const payload = {
      CurrencyName: this.addForm.value.currencyName,
      Description: this.addForm.value.description,
      CreatedBy: '1',
      UpdatedBy: '1',
      IsActive: true
    };

    if (this.isEditMode) {
      this.currencyService.update(this.selectedCurrency.id, payload).subscribe({
        next: () => {
          this.toast.showSuccess('Currency updated successfully');
          this.loadCurrencies();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to update currency')
      });
    } else {
      this.currencyService.create(payload).subscribe({
        next: () => {
          this.toast.showSuccess('Currency created successfully');
          this.loadCurrencies();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to create currency')
      });
    }
  }

  // Confirm delete
  confirmDeleteCurrency(data: any) {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => this.deleteCurrency(data),
      reject: () => {}
    });
  }

  // Delete (soft delete)
  deleteCurrency(item: any) {
    this.currencyService.delete(item.id).subscribe(() => {
      this.toast.showSuccess('Currency deleted successfully');
      this.loadCurrencies();
    });
  }
}
