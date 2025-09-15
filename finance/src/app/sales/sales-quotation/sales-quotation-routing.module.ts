import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesQuotationListComponent } from './sales-quotation-list/sales-quotation-list.component';


const routes: Routes = [
  { path: '', component: SalesQuotationListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesQuotationRoutingModule { }
