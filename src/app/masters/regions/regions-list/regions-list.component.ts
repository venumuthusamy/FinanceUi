import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { RegionService } from '../regions.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html',
  styleUrls: ['./regions-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RegionsListComponent {

  headervalue: any
  regionList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchRegionName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private regionService : RegionService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Regions';
     this.regionService.getRegion().subscribe((data :any) => {
            this.regionList = data
      });  
  }

  createRegion(){
    this.router.navigateByUrl('masters/regions/create')
  }
  editRegion(item : any){
    this.router.navigateByUrl(`masters/regions/edit/${item.id}`)
  }

  deleteRegion(item : any){
    this.regionService.deleteRegion(item.id).subscribe((res)=>{
      this.toast.showSuccess("Region Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterRegion() {  
    this.regionService.getRegion().subscribe((data :any) => {
        this.filteredList= data
          if (this.searchRegionName) {
        this.filteredList = this.filteredList.filter((region: any) =>
          (!this.searchRegionName || region.regionName.toLowerCase().includes(this.searchRegionName.toLowerCase()))

        );
        }
        this.regionList = this.filteredList;
        this.page = 1;
    }); 
  }

  clearField(field: string) {
    if (field === 'searchRegionName') {
      this.searchRegionName = '';
    } 
    this.filterRegion();
  } 

   confirmdeleteRegion(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteRegion(item);
          },
          reject: () => {
          }
        });
  }
}









