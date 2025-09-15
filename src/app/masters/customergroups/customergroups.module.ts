import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomergroupsListComponent } from './customergroups-list/customergroups-list.component';
import { CustomergroupsCreateComponent } from './customergroups-create/customergroups-create.component';
import { CustomerGroupsRoutingModule } from './customergroups-routing.module';
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


@NgModule({
  declarations: [
    CustomergroupsListComponent,
    CustomergroupsCreateComponent,
  ],
  imports: [
    CommonModule,
    CustomerGroupsRoutingModule,
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
export class CustomerGroupsModule { }