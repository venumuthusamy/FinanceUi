import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContraVoucherListComponent } from './contra-voucher-list/contra-voucher-list.component';
import { ContraVoucherCreateComponent } from './contra-voucher-create/contra-voucher-create.component';



const routes: Routes = [
  { path: '', component: ContraVoucherListComponent },
  { path: 'create', component: ContraVoucherCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContraVoucherRoutingModule { }
