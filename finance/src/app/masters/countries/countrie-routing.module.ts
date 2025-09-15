import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountriesCreateComponent } from './countries-create/countries-create.component';




const routes: Routes = [
  { path: '', component: CountriesListComponent },
  { path: 'create', component: CountriesCreateComponent },
  { path: 'edit/:id', component: CountriesCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
