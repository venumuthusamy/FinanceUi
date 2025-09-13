import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceCreateComponent } from './service-create/service-create.component';


const routes: Routes = [
  { path: '', component: ServiceListComponent },
  { path: 'create', component: ServiceCreateComponent },
  { path: 'edit/:id', component: ServiceCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxServicesRoutingModule { }
