import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'coa', pathMatch: 'full' },
       { 
        path: 'coa',
        loadChildren: () => import('./coa/coa-module').then(m => m.ChartOfAccountModule)
      },
      { 
        path: 'openingbalance',
        loadChildren: () => import('./opening-balance/opening-balance.module').then(m => m.OpeningBalanceModule)
      },
      { 
        path: 'debitvoucher',
        loadChildren: () => import('./debit-voucher/debit-voucher.module').then(m => m.DebitVoucherModule)
      },
       { 
        path: 'creditvoucher',
        loadChildren: () => import('./credit-voucher/credit-voucher-module').then(m => m.CreditVoucherModule)
      },
      { 
        path: 'contravoucher',
        loadChildren: () => import('./contra-voucher/contra-voucher-module').then(m => m.ContraVoucherModule)
      },
      { 
        path: 'journalvoucher',
        loadChildren: () => import('./journal voucher/journal-voucher-module').then(m => m.JournalVoucherModule)
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
