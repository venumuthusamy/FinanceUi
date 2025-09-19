import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemService } from '../item-service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ItemListComponent {
  headervalue: any
  itemsList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchItemName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private itemService : ItemService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){

    this.headervalue = 'Item';
    this.itemService.getItem().subscribe((data :any) => {
            this.itemsList = data
    });  
  }

  createItem(){
    this.router.navigateByUrl('masters/item/create')
  }
  editItem(item : any){
    this.router.navigateByUrl(`masters/item/edit/${item.id}`)
  }

  deleteItem(item : any){
    this.itemService.deleteItem(item.id).subscribe((res)=>{
      this.toast.showSuccess("Items Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterItem() {
    this.itemService.getItem().subscribe((data :any) => {
      this.filteredList = data
        if (this.searchItemName) {
        this.filteredList = this.filteredList?.filter((items: any) =>
          (!this.searchItemName || items.name.toLowerCase().includes(this.searchItemName.toLowerCase()))

        );
        }
        this.itemsList = this.filteredList;
        this.page = 1;
    });
  }

  clearField(field: string) {
    if (field === 'searchItemName') {
      this.searchItemName = '';
    } 
    this.filterItem();
  } 
   confirmdeleteItem(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteItem(item);
          },
          reject: () => {
          }
        });
  }
}














