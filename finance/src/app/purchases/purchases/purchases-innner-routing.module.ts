import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';
import { PurchasesCreateComponent } from './purchases-create/purchases-create.component';

const routes: Routes = [
  { path: '', component: PurchasesListComponent },
  { path: 'create', component: PurchasesCreateComponent },
  { path: 'edit/:id', component: PurchasesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesInnerRoutingModule { }
