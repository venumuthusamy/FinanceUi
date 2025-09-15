import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'sales', pathMatch: 'full' },
      { 
        path: 'sales',
        loadChildren: () => import('./sales/sales-inner.module').then(m => m.SalesInnerModule)
      },
      { 
        path: 'salesquotation',
        loadChildren: () => import('./sales-quotation/sales-quotation.module').then(m => m.SalesQuotationModule)
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
