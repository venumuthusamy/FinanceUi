import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { DepartmentService } from './departmet-service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DepartmentComponent {

  departmentList: any[] = []; 
  addForm!: FormGroup;        
  showForm = false;          
  isEditMode = false;       
  selectedDept: any = null;   

  constructor(
    private fb: FormBuilder,
    private deptService: DepartmentService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      departmentCode: ['', Validators.required],
      departmentName: ['', Validators.required]
    });

    this.loadDepartments();
  }

  // Load data from API
  loadDepartments() {
    debugger
    this.deptService.getDepartment().subscribe((data :any) => {
            this.departmentList = data
      });
  }

  // Show form for creating
  createDept() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedDept = null;
    this.addForm.reset();
  }

  // Show form for editing
  editDept(dept: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedDept = dept;
    this.addForm.patchValue({
      departmentCode: dept.departmentCode,
      departmentName: dept.departmentName
    });
  }

  // Cancel and hide form
  cancel() {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedDept = null;
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
      const updatedDept = { ...this.selectedDept, ...this.addForm.value };
      this.deptService.updateDepartment(this.selectedDept.id, updatedDept).subscribe({
        next: () => {
          this.toast.showSuccess('Department updated successfully');
          this.loadDepartments();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to update department')
      });
    } else {
      this.deptService.insertDepartment(this.addForm.value).subscribe({
        next: () => {
          this.toast.showSuccess('Department created successfully');
          this.loadDepartments();
          this.cancel();
        },
        error: () => this.toast.showApiError('Failed to create department')
      });
    }
  }

  // Delete
  confirmdeleteDept(dept: any) {
 
       this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteDepartment(dept);
          },
          reject: () => {
          }
        });
    
  }
   // Delete
  deleteDepartment(item : any){
    this.deptService.deleteDepartment(item.id).subscribe((res)=>{
      this.toast.showSuccess("Department Details deleted successfully")
      this.ngOnInit()  
    })
  }
}
