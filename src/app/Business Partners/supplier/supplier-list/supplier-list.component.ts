import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SupplierService } from '../supplier-service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SupplierListComponent {

  headervalue: any
  supplierList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchSupplierName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private supplierService : SupplierService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){

    this.headervalue = 'Suppliers';
    this.supplierService.getSupplier().subscribe((data :any) => {
            this.supplierList = data
    });  
  }

  createSupplier(){
    this.router.navigateByUrl('bp/supplier/create')
  }
  editSupplier(item : any){
    this.router.navigateByUrl(`bp/supplier/edit/${item.id}`)
  }

  deleteSupplier(item : any){
    this.supplierService.deleteSupplier(item.id).subscribe((res)=>{
      this.toast.showSuccess("Supplier Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterSupplier() {
    this.supplierService.getSupplier().subscribe((data :any) => {
        this.filteredList = data
        if (this.searchSupplierName) {
        this.filteredList = this.filteredList?.filter((supplier: any) =>
          (!this.searchSupplierName || supplier.name.toLowerCase().includes(this.searchSupplierName.toLowerCase()))

        );
        }
        this.supplierList = this.filteredList;
        this.page = 1;
    });
    
  }

  clearField(field: string) {
    if (field === 'searchSupplierName') {
      this.searchSupplierName = '';
    } 
    this.filterSupplier();
  } 
   confirmdeleteSupplier(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteSupplier(item);
          },
          reject: () => {
          }
        });
  }
}











