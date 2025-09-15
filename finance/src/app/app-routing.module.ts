import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./forgot-password/forgot.module').then(m => m.ForgotModule)
      },
       {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password-module').then(m => m.ResetModule)
      },
      
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
      },
      {
        path: 'masters',
        loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule)
      },
      {
        path: 'meeting',
        loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingModule)
      },
      {
        path: 'bp',
        loadChildren: () => import('./Business Partners/business-partner.module').then(m => m.BusinessPartnerModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
      },
       {
        path: 'purchases',
        loadChildren: () => import('./purchases/purchases.module').then(m => m.PurchasesModule)
      },
      {
        path: 'financial',
        loadChildren: () => import('./financial/finance.module').then(m => m.FinancialModule)
      }
      
    ]
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
