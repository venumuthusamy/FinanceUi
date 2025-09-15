import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { StateService } from '../states.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class StatesListComponent {

  headervalue: any
  stateList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  searchStateName: string = '';
  filteredList: any;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private stateService : StateService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'States';
    this.stateService.getState().subscribe((data :any) => {
          this.stateList = data
    });  
  }

  createState(){
    this.router.navigateByUrl('masters/states/create')
  }
  editState(item : any){
    this.router.navigateByUrl(`masters/states/edit/${item.id}`)
  }
  deleteState(item : any){
    this.stateService.deleteState(item.stateId).subscribe((res)=>{
      this.toast.showSuccess("State Details deleted successfully")
      this.ngOnInit()  
    })
  }

  filterState() {
    this.stateService.getState().subscribe((data :any) => {
        this.filteredList = data
        if (this.searchStateName) {
        this.filteredList = this.filteredList.filter((country: any) =>
          (!this.searchStateName || country.stateName.toLowerCase().includes(this.searchStateName.toLowerCase()))
        );
        }
        this.stateList = this.filteredList;
        this.page = 1;
    });
    
  }

  clearField(field: string) {
    if (field === 'searchStateName') {
      this.searchStateName = '';
    } 
    this.filterState();
  } 
   confirmdeleteState(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteState(item);
          },
          reject: () => {
          }
        });
  } 
}









