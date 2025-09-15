import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebitVoucherListComponent } from './debit-voucher-list/debit-voucher-list.component';
import { DebitVoucherCreateComponent } from './debit-voucher-create/debit-voucher-create.component';


const routes: Routes = [
  { path: '', component: DebitVoucherListComponent },
  { path: 'create', component: DebitVoucherCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitVoucherRoutingModule { }
