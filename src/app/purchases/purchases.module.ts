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



const routes: Routes = [
  { path: 'list', component: PurchasesListComponent },
  { path: 'create', component: PurchasesCreateComponent },
  { path: 'edit/:id', component: PurchasesCreateComponent },
  { path: 'requisition', component: PurchaseRequisitionComponent },
   { path: 'order', component: PurchaseOrderComponent },
];
@NgModule({
  declarations: [
      PurchasesListComponent,
         PurchasesCreateComponent,
         PurchaseRequisitionComponent,
         PurchaseOrderComponent
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