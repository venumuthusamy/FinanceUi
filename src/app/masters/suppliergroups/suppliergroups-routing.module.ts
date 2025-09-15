import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliergroupsListComponent } from './suppliergroups-list/suppliergroups-list.component';
import { SuppliergroupsCreateComponent } from './suppliergroups-create/suppliergroups-create.component';


const routes: Routes = [
  { path: '', component: SuppliergroupsListComponent },
  { path: 'create', component: SuppliergroupsCreateComponent },
  { path: 'edit/:id', component: SuppliergroupsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierGroupsRoutingModule { }
