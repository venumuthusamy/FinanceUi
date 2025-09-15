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
import { DebitVoucherRoutingModule } from './debit-voucher-routing-module';
import { DebitVoucherCreateComponent } from './debit-voucher-create/debit-voucher-create.component';
import { DebitVoucherListComponent } from './debit-voucher-list/debit-voucher-list.component';


@NgModule({
  declarations: [
    DebitVoucherCreateComponent,
    DebitVoucherListComponent
  ],
  imports: [
    CommonModule,
    DebitVoucherRoutingModule,
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
export class DebitVoucherModule { }