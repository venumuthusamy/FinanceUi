import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from '../Business Partners/supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from '../Business Partners/supplier/supplier-create/supplier-create.component';
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


const routes: Routes = [
  { path: '', component: SupplierListComponent },
  { path: 'create', component: SupplierCreateComponent },
  { path: 'edit/:id', component: SupplierCreateComponent },  
  { path: "profile", component:SupplierProfileComponent}
];

@NgModule({
  declarations: [
    SupplierProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
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
        
  ]
})
export class BusinessPartnerModule { }