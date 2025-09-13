import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationCreateComponent } from './location-create/location-create.component';


const routes: Routes = [
  { path: '', component: LocationListComponent },
  { path: 'create', component: LocationCreateComponent },
  { path: 'edit/:id', component: LocationCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
