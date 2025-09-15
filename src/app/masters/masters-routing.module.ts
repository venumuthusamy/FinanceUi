import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'countries', pathMatch: 'full' },
      { 
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
      },
      { 
        path: 'states',
        loadChildren: () => import('./states/states.module').then(m => m.StatesModule)
      },
      { 
        path: 'city',
        loadChildren: () => import('./cities/city.module').then(m => m.CitiesModule)
      },
      { 
        path: 'service',
        loadChildren: () => import('./services/service-module').then(m => m.TaxServicesModule)
      },
      { 
        path: 'customergroups',
        loadChildren: () => import('./customergroups/customergroups.module').then(m => m.CustomerGroupsModule)
      },
       { 
        path: 'suppliergroups',
        loadChildren: () => import('./suppliergroups/suppliergroups.module').then(m => m.SupplierGroupsModule)
      },
      { 
        path: 'regions',
        loadChildren: () => import('./regions/regions.module').then(m => m.RegionsModule)
      },
      { 
        path: 'locations',
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
      },
      { 
        path: 'warehouses',
        loadChildren: () => import('./warehouses/warehouses.module').then(m => m.WarehouseModule)
      },
      { 
        path: 'deductions',
        loadChildren: () => import('./deductions/deductions.module').then(m => m.DeductionModule)
      },
      { 
        path: 'incomes',
        loadChildren: () => import('./incomes/incomes.module').then(m => m.IncomeModule)
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
