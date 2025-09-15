import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaxServices } from '../service-service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ServiceListComponent {
  headervalue: any
  servicesList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchServicesName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private taxServices : TaxServices,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Services';
     this.taxServices.getServices().subscribe((data :any) => {
            this.servicesList = data
      });  
  }

  createServices(){
    this.router.navigateByUrl('masters/service/create')
  }
  editServices(item : any){
    this.router.navigateByUrl(`masters/service/edit/${item.id}`)
  }

  deleteServices(item : any){
    this.taxServices.deleteServices(item.id).subscribe((res)=>{
      this.toast.showSuccess("Service deleted successfully")
      this.ngOnInit()  
    })
  }
  filterServices() {
    this.taxServices.getServices().subscribe((data :any) => {
      this.filteredList = data
        if (this.searchServicesName) {
        this.filteredList = this.filteredList.filter((country: any) =>
          (!this.searchServicesName || country.name.toLowerCase().includes(this.searchServicesName.toLowerCase()))

        );
        }
        this.servicesList = this.filteredList;
        this.page = 1;
    });
  }

  clearField(field: string) {
    if (field === 'searchServicesName') {
      this.searchServicesName = '';
    } 
    this.filterServices();
  } 

  confirmdeleteServices(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteServices(item);
          },
          reject: () => {
          }
        });
  }
}













