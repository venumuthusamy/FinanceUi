import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomergroupsListComponent } from './customergroups-list/customergroups-list.component';
import { CustomergroupsCreateComponent } from './customergroups-create/customergroups-create.component';


const routes: Routes = [
  { path: '', component: CustomergroupsListComponent },
  { path: 'create', component: CustomergroupsCreateComponent },
  { path: 'edit/:id', component: CustomergroupsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupsRoutingModule { }
