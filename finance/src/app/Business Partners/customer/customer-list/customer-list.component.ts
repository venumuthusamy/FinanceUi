import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CustomerService } from '../customer-service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CustomerListComponent {

  headervalue: any
  customerList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchCustomerName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private customerService : CustomerService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){

    this.headervalue = 'Customers';
    this.customerService.getCustomer().subscribe((data :any) => {
            this.customerList = data
    });  
  }

  createCustomer(){
    this.router.navigateByUrl('bp/customer/create')
  }
  editcustomer(item : any){
    this.router.navigateByUrl(`bp/customer/edit/${item.id}`)
  }

  deleteCustomer(item : any){
    this.customerService.deleteCustomer(item.id).subscribe((res)=>{
      this.toast.showSuccess("Customer Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterCustomers() {
    this.customerService.getCustomer().subscribe((data :any) => {
        this.filteredList = data
          if (this.searchCustomerName) {
          this.filteredList = this.filteredList?.filter((customer: any) =>
            (!this.searchCustomerName || customer.name.toLowerCase().includes(this.searchCustomerName.toLowerCase()))

          );
        }
        this.customerList = this.filteredList;
        this.page = 1;
    });
  }

  clearField(field: string) {
    if (field === 'searchCustomerName') {
      this.searchCustomerName = '';
    } 
    this.filterCustomers();
  } 
   confirmdeleteCustomer(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteCustomer(item);
          },
          reject: () => {
          }
        });
  }
}







