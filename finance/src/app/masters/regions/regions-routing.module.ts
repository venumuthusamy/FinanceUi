import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionsListComponent } from './regions-list/regions-list.component';
import { RegionsCreateComponent } from './regions-create/regions-create.component';


const routes: Routes = [
  { path: '', component: RegionsListComponent },
  { path: 'create', component: RegionsCreateComponent },
  { path: 'edit/:id', component: RegionsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
