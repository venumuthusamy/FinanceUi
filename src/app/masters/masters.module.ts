import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { CountriesCreateComponent } from './countries/countries-create/countries-create.component';
import { StatesListComponent } from './states/states-list/states-list.component';
import { StatesCreateComponent } from './states/states-create/states-create.component';
import { CityListComponent } from './cities/city-list/city-list.component';
import { CityCreateComponent } from './cities/city-create/city-create.component';
import { ServiceListComponent } from './services/service-list/service-list.component';
import { ServiceCreateComponent } from './services/service-create/service-create.component';
import { CustomergroupsListComponent } from './customergroups/customergroups-list/customergroups-list.component';
import { CustomergroupsCreateComponent } from './customergroups/customergroups-create/customergroups-create.component';
import { SuppliergroupsListComponent } from './suppliergroups/suppliergroups-list/suppliergroups-list.component';
import { SuppliergroupsCreateComponent } from './suppliergroups/suppliergroups-create/suppliergroups-create.component';
import { RegionsListComponent } from './regions/regions-list/regions-list.component';
import { RegionsCreateComponent } from './regions/regions-create/regions-create.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { WarehousesListComponent } from './warehouses/warehouses-list/warehouses-list.component';
import { WarehousesCreateComponent } from './warehouses/warehouses-create/warehouses-create.component';
import { DeductionsListComponent } from './deductions/deductions-list/deductions-list.component';
import { DeductionsCreateComponent } from './deductions/deductions-create/deductions-create.component';
import { IncomesListComponent } from './incomes/incomes-list/incomes-list.component';
import { IncomesCreateComponent } from './incomes/incomes-create/incomes-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule  } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DepartmentComponent } from './department/department/department.component';
import { UomComponent } from './uom/uom/uom.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'countries', pathMatch: 'full' },
      { path: 'countries',component: CountriesListComponent},
      { path: 'countries/create',component: CountriesCreateComponent},
      { path: 'countries/edit/:id',component: CountriesCreateComponent},
      { path: 'states',component: StatesListComponent},
      { path: 'states/create',component: StatesCreateComponent},
      { path: 'states/edit/:id',component: StatesCreateComponent},
      { path: 'city', component: CityListComponent },
      { path: 'city/create', component: CityCreateComponent },
      { path: 'city/edit/:id', component: CityCreateComponent },
      { path: 'service', component: ServiceListComponent },
      { path: 'service/create', component: ServiceCreateComponent },
      { path: 'service/edit/:id', component: ServiceCreateComponent },
      { path: 'customergroups',component: CustomergroupsListComponent},
      { path: 'customergroups/create',component: CustomergroupsCreateComponent},
      { path: 'customergroups/edit/:id',component: CustomergroupsCreateComponent},
      { path: 'suppliergroups',component: SuppliergroupsListComponent},
      { path: 'suppliergroups/create',component: SuppliergroupsCreateComponent},
      { path: 'suppliergroups/edit/:id',component: SuppliergroupsCreateComponent},
      { path: 'regions', component: RegionsListComponent},
      { path: 'regions/create', component: RegionsCreateComponent},
      { path: 'regions/edit/:id', component: RegionsCreateComponent},
      { path: 'locations',component: LocationListComponent},
      { path: 'locations/create',component: LocationCreateComponent},
      { path: 'locations/edit/:id',component: LocationCreateComponent},
      { path: 'warehouses',component: WarehousesListComponent },
      { path: 'warehouses/create',component: WarehousesCreateComponent },
      { path: 'warehouses/edit/:id',component: WarehousesCreateComponent },
      { path: 'deductions',component: DeductionsListComponent },
      { path: 'deductions/create',component: DeductionsCreateComponent },
      { path: 'deductions/edit/:id',component: DeductionsCreateComponent },
      { path: 'incomes',component: IncomesListComponent },
      { path: 'incomes/create',component: IncomesCreateComponent },
      { path: 'incomes/edit/:id',component: IncomesCreateComponent },
      { path: 'department',component: DepartmentComponent },
      { path: 'uom',component: UomComponent },
      { path: 'item',component: ItemListComponent },
      { path: 'item/create',component: ItemCreateComponent },
      { path: 'item/edit/:id',component: ItemCreateComponent },
    ]
  }
];


@NgModule({
  declarations: [
    CountriesListComponent,
    CountriesCreateComponent,
    StatesListComponent,
    StatesCreateComponent,
    CityListComponent,
    CityCreateComponent,
    ServiceListComponent,
    ServiceCreateComponent,
    CustomergroupsListComponent,
    CustomergroupsCreateComponent,
    SuppliergroupsListComponent,
    SuppliergroupsCreateComponent,
    RegionsListComponent,
    RegionsCreateComponent,
    LocationListComponent,
    LocationCreateComponent,
    WarehousesListComponent,
    WarehousesCreateComponent,
    DeductionsListComponent,
    DeductionsCreateComponent,
    IncomesListComponent,
    IncomesCreateComponent,
    DepartmentComponent,
    UomComponent,
    ItemListComponent,
    ItemCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    NgxPaginationModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class MastersModule { }