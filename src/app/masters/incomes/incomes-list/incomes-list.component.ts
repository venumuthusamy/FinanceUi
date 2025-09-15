import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IncomeService } from '../incomes-service';


@Component({
  selector: 'app-incomes-list',
  templateUrl: './incomes-list.component.html',
  styleUrls: ['./incomes-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class IncomesListComponent {
  headervalue: any
  incomeList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchIncomeName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private incomeService : IncomeService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Incomes';
     this.incomeService.getIncome().subscribe((data :any) => {
            this.incomeList = data
      });  
  }
  createIncome(){
    this.router.navigateByUrl('masters/incomes/create')
  }
  editIncome(item : any){
    this.router.navigateByUrl(`masters/incomes/edit/${item.id}`)
  }
  deleteIncome(item : any){
    this.incomeService.deleteIncome(item.id).subscribe((res)=>{
      this.toast.showSuccess("Income Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterIncome() {
    this.incomeService.getIncome().subscribe((data :any) => {
        this.filteredList = data
          if (this.searchIncomeName) {
          this.filteredList = this.filteredList.filter((income: any) =>
            (!this.searchIncomeName || income.name.toLowerCase().includes(this.searchIncomeName.toLowerCase()))

          );
          }
          this.incomeList = this.filteredList;
          this.page = 1;
    });
  }
  clearField(field: string) {
    if (field === 'searchIncomeName') {
      this.searchIncomeName = '';
    } 
    this.filterIncome();
  } 

  confirmdeleteIncome(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteIncome(item);
          },
          reject: () => {
          }
        });
  }
}













