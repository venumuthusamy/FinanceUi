import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'customer', pathMatch: 'full' },
      { 
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
      },
      { 
        path: 'supplier',
        loadChildren: () => import('./supplier/supplier-module').then(m => m.SupplierModule)
      },  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessPartnerRoutingModule { }