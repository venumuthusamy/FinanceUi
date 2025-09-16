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
import { PurchasesListComponent } from './purchases/purchases-list/purchases-list.component';
import { PurchasesCreateComponent } from './purchases/purchases-create/purchases-create.component';

import { PurchaseRequisitionComponent } from './purchase-requisition/purchase-requisition.component';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseGoodreceiptComponent } from './purchase-goodreceipt/purchase-goodreceipt.component';

import { SupplierInvoiceListComponent } from './supplier-invoice/supplier-invoice-list/supplier-invoice-list.component';
import { SupplierInvoiceCreateComponent } from './supplier-invoice/supplier-invoice-create/supplier-invoice-create.component';
import { DebitNoteCreateComponent } from './debit-note/debit-note-create/debit-note-create.component';


const routes: Routes = [
  { path: 'list', component: PurchasesListComponent },
  { path: 'create', component: PurchasesCreateComponent },
  { path: 'edit/:id', component: PurchasesCreateComponent },
  { path: 'requisition', component: PurchaseRequisitionComponent },
   { path: 'order', component: PurchaseOrderComponent },
   { path: 'goodreceipt', component: PurchaseGoodreceiptComponent },
  { path: 'supplier-invoice', component: SupplierInvoiceCreateComponent },
  { path: 'debit-note', component: DebitNoteCreateComponent },
];
@NgModule({
  declarations: [
      PurchasesListComponent,
         PurchasesCreateComponent,
         PurchaseRequisitionComponent,
         PurchaseOrderComponent,
         PurchaseGoodreceiptComponent,
          SupplierInvoiceListComponent,
         SupplierInvoiceCreateComponent,
         DebitNoteCreateComponent
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
export class PurchasesModule { }