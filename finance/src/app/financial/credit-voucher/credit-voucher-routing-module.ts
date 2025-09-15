import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditVoucherListComponent } from './credit-voucher-list/credit-voucher-list.component';
import { CreditVoucherCreateComponent } from './credit-voucher-create/credit-voucher-create.component';



const routes: Routes = [
  { path: '', component: CreditVoucherListComponent },
  { path: 'create', component: CreditVoucherCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditVoucherRoutingModule { }
