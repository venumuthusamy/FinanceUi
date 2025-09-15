// dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesQuotationRoutingModule } from './sales-quotation-routing.module';
import { SalesQuotationListComponent } from './sales-quotation-list/sales-quotation-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    SalesQuotationListComponent,
  ],
  imports: [
    CommonModule,
    SalesQuotationRoutingModule,
    DropdownModule,
        CalendarModule
  ]
})
export class SalesQuotationModule { }