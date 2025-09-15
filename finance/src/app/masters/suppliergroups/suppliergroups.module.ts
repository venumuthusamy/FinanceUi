import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule  } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SupplierGroupsRoutingModule } from './suppliergroups-routing.module';
import { SuppliergroupsListComponent } from './suppliergroups-list/suppliergroups-list.component';
import { SuppliergroupsCreateComponent } from './suppliergroups-create/suppliergroups-create.component';


@NgModule({
  declarations: [
    SuppliergroupsListComponent,
    SuppliergroupsCreateComponent,
  ],
  imports: [
    CommonModule,
    SupplierGroupsRoutingModule,
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
export class SupplierGroupsModule { }