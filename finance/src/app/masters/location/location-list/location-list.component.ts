import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationService } from '../location-service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class LocationListComponent {
  headervalue: any
  locationList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchLocationName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private locationService : LocationService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){

    this.headervalue = 'Locations';
    this.locationService.getLocation().subscribe((data :any) => {
            this.locationList = data
    });  
  }

  createLocation(){
    this.router.navigateByUrl('masters/locations/create')
  }
  editLocation(item : any){
    this.router.navigateByUrl(`masters/locations/edit/${item.id}`)
  }

  deleteLocation(item : any){
    this.locationService.deleteLocation(item.id).subscribe((res)=>{
      this.toast.showSuccess("Locations Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterLocation() {
    this.locationService.getLocation().subscribe((data :any) => {
        this.filteredList = data
          if (this.searchLocationName) {
          this.filteredList = this.filteredList?.filter((location: any) =>
            (!this.searchLocationName || location.name.toLowerCase().includes(this.searchLocationName.toLowerCase()))

          );
          }
          this.locationList = this.filteredList;
          this.page = 1;
    });
  }

  clearField(field: string) {
    if (field === 'searchLocationName') {
      this.searchLocationName = '';
    } 
    this.filterLocation();
  } 
   confirmdeleteLocation(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteLocation(item);
          },
          reject: () => {
          }
        });
  }
}









