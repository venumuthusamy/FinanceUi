import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { CountryService } from '../countries.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CountriesListComponent {

  headervalue: any
  countryList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchCountryName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private countryService : CountryService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Countries';
     this.countryService.getCountry().subscribe((data :any) => {
            this.countryList = data
      });  
  }
  createCountry(){
    this.router.navigateByUrl('masters/countries/create')
  }
  editcountry(item : any){
    this.router.navigateByUrl(`masters/countries/edit/${item.id}`)
  }
  deleteCountry(item : any){
    this.countryService.deleteCountry(item.id).subscribe((res)=>{
      this.toast.showSuccess("Country Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterCountry() {
    this.countryService.getCountry().subscribe((data :any) => {
      this.filteredList = data
        if (this.searchCountryName) {
        this.filteredList = this.filteredList.filter((country: any) =>
          (country.countryName.toLowerCase().includes(this.searchCountryName.toLowerCase()))

        );
        }
        this.countryList = this.filteredList;
        this.page = 1;
                    
    });
  }
  clearField(field: string) {
    if (field === 'searchCountryName') {
      this.searchCountryName = '';
    } 
    this.filterCountry();
  } 

  confirmdeleteCountry(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteCountry(item);
          },
          reject: () => {
          }
        });
  }
}








