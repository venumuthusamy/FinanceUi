import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DeductionService } from '../deductions-service';

@Component({
  selector: 'app-deductions-list',
  templateUrl: './deductions-list.component.html',
  styleUrls: ['./deductions-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DeductionsListComponent {
  headervalue: any
  deductionList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchDeductionName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private deductionService : DeductionService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Deductions';
     this.deductionService.getDeduction().subscribe((data :any) => {
            this.deductionList = data
      });  
  }
  createDeduction(){
    this.router.navigateByUrl('masters/deductions/create')
  }
  editDeduction(item : any){
    this.router.navigateByUrl(`masters/deductions/edit/${item.id}`)
  }
  deleteDeduction(item : any){
    this.deductionService.deleteDeduction(item.id).subscribe((res)=>{
      this.toast.showSuccess("Deduction Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterDeduction() {
    this.deductionService.getDeduction().subscribe((data :any) => {
        this.filteredList = data
          if (this.searchDeductionName) {
        this.filteredList = this.filteredList.filter((deduction: any) =>
          (!this.searchDeductionName || deduction.name.toLowerCase().includes(this.searchDeductionName.toLowerCase()))

        );
        }
        this.deductionList = this.filteredList;
        this.page = 1;
    });
   
  }
  clearField(field: string) {
    if (field === 'searchDeductionName') {
      this.searchDeductionName = '';
    } 
    this.filterDeduction();
  } 

  confirmdeleteDeduction(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteDeduction(item);
          },
          reject: () => {
          }
        });
  }
}











