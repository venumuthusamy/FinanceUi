import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehousesListComponent } from './warehouses-list/warehouses-list.component';
import { WarehousesCreateComponent } from './warehouses-create/warehouses-create.component';



const routes: Routes = [
  { path: '', component: WarehousesListComponent },
  { path: 'create', component: WarehousesCreateComponent },
  { path: 'edit/:id', component: WarehousesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
