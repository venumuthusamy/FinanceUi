import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomesListComponent } from './incomes-list/incomes-list.component';
import { IncomesCreateComponent } from './incomes-create/incomes-create.component';


const routes: Routes = [
  { path: '', component: IncomesListComponent },
  { path: 'create', component: IncomesCreateComponent },
  { path: 'edit/:id', component: IncomesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
