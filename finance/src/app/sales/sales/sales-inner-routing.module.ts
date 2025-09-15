import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesCreateComponent } from './sales-create/sales-create.component';

const routes: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'create', component: SalesCreateComponent },
  { path: 'edit/:id', component: SalesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesInnerRoutingModule { }
