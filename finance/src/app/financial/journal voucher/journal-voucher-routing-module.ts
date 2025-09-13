import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalVoucherListComponent } from './journal-voucher-list/journal-voucher-list.component';
import { JournalVoucherCreateComponent } from './journal-voucher-create/journal-voucher-create.component';




const routes: Routes = [
  { path: '', component: JournalVoucherListComponent },
  { path: 'create', component: JournalVoucherCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalVoucherRoutingModule { }
