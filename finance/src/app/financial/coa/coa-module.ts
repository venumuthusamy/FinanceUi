import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CoaCreateComponent } from './coa-create/coa-create.component';
import { CoaListComponent } from './coa-list/coa-list.component';
import { ChartOfAccountRoutingModule } from './coa-routing-module';
import { TreeTableModule } from 'primeng/treetable';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    CoaCreateComponent,
    CoaListComponent
  ],
  imports: [
    CommonModule,
    ChartOfAccountRoutingModule,
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
    ToastModule,
    TreeTableModule,
    TooltipModule
  ]
})
export class ChartOfAccountModule { }