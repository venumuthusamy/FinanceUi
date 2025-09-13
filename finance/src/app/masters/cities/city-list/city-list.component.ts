import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CityService } from '../city.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CityListComponent {

  headervalue: any
  cityList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchCityName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private cityService : CityService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Cities';
     this.cityService.getCity().subscribe((data :any) => {
            this.cityList = data
      });  
  }

  createCity(){
    this.router.navigateByUrl('masters/city/create')
  }
  editCity(item : any){
    this.router.navigateByUrl(`masters/city/edit/${item.id}`)
  }

  deleteCity(item : any){
    this.cityService.deleteCity(item.cityId).subscribe((res)=>{
      this.toast.showSuccess("City Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterCity() {
    this.cityService.getCity().subscribe((data :any) => {
        this.filteredList = data
         if (this.searchCityName) {
        this.filteredList = this.filteredList.filter((country: any) =>
          (!this.searchCityName || country.cityName.toLowerCase().includes(this.searchCityName.toLowerCase()))

        );
        }
        this.cityList = this.filteredList;
        this.page = 1;
    }); 
  }

  clearField(field: string) {
    if (field === 'searchCityName') {
      this.searchCityName = '';
    } 
    this.filterCity();
  } 
   confirmdeleteCity(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteCity(item);
          },
          reject: () => {
          }
        });
  }
}










