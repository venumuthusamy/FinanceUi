import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WarehouseService } from '../warehouses-service';

@Component({
  selector: 'app-warehouses-list',
  templateUrl: './warehouses-list.component.html',
  styleUrls: ['./warehouses-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class WarehousesListComponent {
  headervalue: any
  warehouseList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchWarehouseName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private warehouseService : WarehouseService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){

    this.headervalue = 'Warehouses';
    this.warehouseService.getWarehouse().subscribe((data :any) => {
            this.warehouseList = data
    });  
  }

  createWarehouse(){
    this.router.navigateByUrl('masters/warehouses/create')
  }
  editWarehouse(item : any){
    this.router.navigateByUrl(`masters/warehouses/edit/${item.id}`)
  }

  deleteWarehouse(item : any){
    this.warehouseService.deleteWarehouse(item.id).subscribe((res)=>{
      this.toast.showSuccess("Warehouses Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterWarehouse() {
    this.warehouseService.getWarehouse().subscribe((data :any) => {
      this.filteredList = data
        if (this.searchWarehouseName) {
        this.filteredList = this.filteredList?.filter((warehouses: any) =>
          (!this.searchWarehouseName || warehouses.name.toLowerCase().includes(this.searchWarehouseName.toLowerCase()))

        );
        }
        this.warehouseList = this.filteredList;
        this.page = 1;
    });
  }

  clearField(field: string) {
    if (field === 'searchWarehouseName') {
      this.searchWarehouseName = '';
    } 
    this.filterWarehouse();
  } 
   confirmdeleteWarehouse(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteWarehouse(item);
          },
          reject: () => {
          }
        });
  }
}












