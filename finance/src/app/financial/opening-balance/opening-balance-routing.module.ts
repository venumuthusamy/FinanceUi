import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningBalanceCreateComponent } from './opening-balance-create/opening-balance-create.component';


const routes: Routes = [
  { path: '', component: OpeningBalanceCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeningBalanceRoutingModule { }
