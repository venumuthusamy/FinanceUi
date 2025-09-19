import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button'; 
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule  } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';


const routes: Routes = [
  { path: 'customer', component: CustomerListComponent },
  { path: 'customer/create', component: CustomerCreateComponent },
  { path: 'customer/edit/:id', component: CustomerCreateComponent },  
  { path: "profile", component:SupplierProfileComponent}
];

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerCreateComponent,
    SupplierProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
         ReactiveFormsModule,
        FormsModule,
        HttpClientModule, 
        NgxPaginationModule,
        TableModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        ConfirmDialogModule,
        ToastModule
  ]
})
export class BusinessPartnerModule { }