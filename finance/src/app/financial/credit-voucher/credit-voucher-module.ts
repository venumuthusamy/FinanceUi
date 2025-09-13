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
import { CreditVoucherCreateComponent } from './credit-voucher-create/credit-voucher-create.component';
import { CreditVoucherListComponent } from './credit-voucher-list/credit-voucher-list.component';
import { CreditVoucherRoutingModule } from './credit-voucher-routing-module';


@NgModule({
  declarations: [
    CreditVoucherCreateComponent,
    CreditVoucherListComponent
  ],
  imports: [
    CommonModule,
    CreditVoucherRoutingModule,
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
export class CreditVoucherModule { }