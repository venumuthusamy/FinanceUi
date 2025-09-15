import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SupplierGroupsService } from '../suppliergroups.service';

@Component({
  selector: 'app-suppliergroups-list',
  templateUrl: './suppliergroups-list.component.html',
  styleUrls: ['./suppliergroups-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SuppliergroupsListComponent {

  headervalue: any
  supplierGroupsList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchSupplierGroupName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private supplierGroupsService : SupplierGroupsService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Supplier Groups';
     this.supplierGroupsService.getSupplierGroups().subscribe((data :any) => {
            this.supplierGroupsList = data
      });  
  }

  createSupplierGroups(){
    this.router.navigateByUrl('masters/suppliergroups/create')
  }
  editSupplierGroups(item : any){
    this.router.navigateByUrl(`masters/suppliergroups/edit/${item.id}`)
  }

  deleteSupplierGroups(item : any){
    this.supplierGroupsService.deleteSupplierGroups(item.id).subscribe((res)=>{
      this.toast.showSuccess("Supplier Groups deleted successfully")
      this.ngOnInit()  
    })
  }
  filterSupplierGroups() {
    this.supplierGroupsService.getSupplierGroups().subscribe((data :any) => {
        this.filteredList = data
        if (this.searchSupplierGroupName) {
        this.filteredList = this.filteredList.filter((country: any) =>
          (!this.searchSupplierGroupName || country.name.toLowerCase().includes(this.searchSupplierGroupName.toLowerCase()))

        );
        }
        this.supplierGroupsList = this.filteredList;
        this.page = 1;
    });
  }

  clearField(field: string) {
    if (field === 'searchSupplierGroupName') {
      this.searchSupplierGroupName = '';
    } 
    this.filterSupplierGroups();
  } 

  confirmdeleteSupplierGroup(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteSupplierGroups(item);
          },
          reject: () => {
          }
        });
  }
}










