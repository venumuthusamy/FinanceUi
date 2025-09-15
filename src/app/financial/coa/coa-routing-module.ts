import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoaListComponent } from './coa-list/coa-list.component';
import { CoaCreateComponent } from './coa-create/coa-create.component';



const routes: Routes = [
  { path: '', component: CoaListComponent },
  { path: 'create', component: CoaCreateComponent },
  { path: 'edit/:id', component: CoaCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartOfAccountRoutingModule { }