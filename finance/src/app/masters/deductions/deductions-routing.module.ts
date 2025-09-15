import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionsListComponent } from './deductions-list/deductions-list.component';
import { DeductionsCreateComponent } from './deductions-create/deductions-create.component';




const routes: Routes = [
  { path: '', component: DeductionsListComponent },
  { path: 'create', component: DeductionsCreateComponent },
  { path: 'edit/:id', component: DeductionsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeductionRoutingModule { }
