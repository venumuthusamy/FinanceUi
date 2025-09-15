import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CustomerGroupsService } from '../customergroups.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-customergroups-list',
  templateUrl: './customergroups-list.component.html',
  styleUrls: ['./customergroups-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CustomergroupsListComponent {

  headervalue: any
  customerGroupsList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchCustomerGroupName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private customerGroupsService : CustomerGroupsService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Customer Groups';
     this.customerGroupsService.getCustomerGroups().subscribe((data :any) => {
            this.customerGroupsList = data
      });  
  }

  createcustomerGroups(){
    this.router.navigateByUrl('masters/customergroups/create')
  }
  editCustomerGroups(item : any){
    this.router.navigateByUrl(`masters/customergroups/edit/${item.id}`)
  }

  deleteCustomerGroups(item : any){
    this.customerGroupsService.deleteCustomerGroups(item.id).subscribe((res)=>{
      this.toast.showSuccess("Customer Groups deleted successfully")
      this.ngOnInit()  
    })
  }
  filterCustomerGroups() {
    this.customerGroupsService.getCustomerGroups().subscribe((data :any) => {
        this.filteredList = data
          if (this.searchCustomerGroupName) {
        this.filteredList = this.filteredList.filter((country: any) =>
          (!this.searchCustomerGroupName || country.name.toLowerCase().includes(this.searchCustomerGroupName.toLowerCase()))

        );
        }
        this.customerGroupsList = this.filteredList;
        this.page = 1;
    });
   
  }

  clearField(field: string) {
    if (field === 'searchCustomerGroupName') {
      this.searchCustomerGroupName = '';
    } 
    this.filterCustomerGroups();
  } 

  confirmdeleteCustomerGroup(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteCustomerGroups(item);
          },
          reject: () => {
          }
        });
  }
}










