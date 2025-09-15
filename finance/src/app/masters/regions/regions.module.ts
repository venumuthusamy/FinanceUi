import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsListComponent } from './regions-list/regions-list.component';
import { RegionsCreateComponent } from './regions-create/regions-create.component';
import { RegionsRoutingModule } from './regions-routing.module';
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

@NgModule({
  declarations: [
    RegionsListComponent,
    RegionsCreateComponent,
  ],
  imports: [
    CommonModule,
    RegionsRoutingModule,
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
export class RegionsModule { }