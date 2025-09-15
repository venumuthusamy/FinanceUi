import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';



const routes: Routes = [
  { path: '', component: SupplierListComponent },
  { path: 'create', component: SupplierCreateComponent },
  { path: 'edit/:id', component: SupplierCreateComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
