import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatesListComponent } from './states-list/states-list.component';
import { StatesCreateComponent } from './states-create/states-create.component';

const routes: Routes = [
  { path: '', component: StatesListComponent },
  { path: 'create', component: StatesCreateComponent },
  { path: 'edit/:id', component: StatesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }
