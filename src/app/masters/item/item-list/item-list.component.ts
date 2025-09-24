import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemService } from '../item-service';
import { ChartOfAccountService } from 'src/app/financial/coa/coa-service';

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
  parentHeadList:any
  accountHeads: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private itemService : ItemService,
    private toast: ToastService,
    private confirmationService: ConfirmationService,
    private chartOfAccountService : ChartOfAccountService,
  ){

  }

  ngOnInit(){

    this.loadAccountHeads();
    this.headervalue = 'Item'; 
  }

  loadAccountHeads() {
  this.chartOfAccountService.getChartOfAccount().subscribe((data) => {
    this.accountHeads = data;
    this.parentHeadList = this.accountHeads.map((head:any)=> ({
      value: head.id,
      label: this.buildFullPath(head)
    }));
     this.itemService.getItem().subscribe((data :any) => {
            this.itemsList = data
            this.itemsList = this.itemsList.map((item: any) => {
            const matched = this.parentHeadList.find(
              (head: any) => head.value == item.budgetLineId
            );

            return {
              ...item,
              label: matched ? matched.label : null   // add the label if found
            };
          });
          console.log(this.itemsList)
    });  
    
  });
  }

  buildFullPath(item:any): string {
    let path = item.headName;
    let current = this.accountHeads.find((x:any) => x.id === item.parentHead);
    while (current) {
      path = `${current.headName} >> ${path}`;
      current = this.accountHeads.find((x:any) => x.id === current.parentHead);
    }
    return path;
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
          (!this.searchItemName || items.itemCode.toLowerCase().includes(this.searchItemName.toLowerCase())
          || items.itemName.toLowerCase().includes(this.searchItemName.toLowerCase()))

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














