import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'purchases', pathMatch: 'full' },
      { 
        path: 'purchases',
        loadChildren: () => import('./purchases/purchases-inner.module').then(m => m.PurchasesInnerModule)
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
