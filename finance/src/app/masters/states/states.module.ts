import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatesRoutingModule } from './states-routing.module';
import { StatesListComponent } from './states-list/states-list.component';
import { StatesCreateComponent } from './states-create/states-create.component';
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
    StatesListComponent,
    StatesCreateComponent
  ],
  imports: [
    CommonModule,
    StatesRoutingModule,
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
export class StatesModule { }