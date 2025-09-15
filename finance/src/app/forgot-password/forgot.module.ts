import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotRoutingModule } from './forgot-routing.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ForgotModule { }