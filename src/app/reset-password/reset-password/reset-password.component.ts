import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import {strongPasswordValidator} from 'src/shared/custom-validators'
import { LoginService } from 'src/app/login/login-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  addForm!: FormGroup;
  userId: any;
  token: string = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
  
  }

  ngOnInit() {
      this.addForm = this.fb.group({
        newPassword: [null, [Validators.required, Validators.minLength(6),strongPasswordValidator]],
        confirmNewPassword: [null, Validators.required],
      }, { validator: this.passwordsMatchValidator });
  }

  
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const newPassword = group.get('newPassword')?.value;
  const confirmNewPassword = group.get('confirmNewPassword')?.value;

  return newPassword === confirmNewPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    this.route.queryParams.subscribe(params => {
    this.token = decodeURIComponent(params['token']);
    this.email = params['email'];
  });
    
    const rawvalue = {
      newPassword : this.addForm.value.newPassword,
      token: this.token,
      email: this.email
    }
  
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      this.loginService.resetPassword( rawvalue).subscribe((res :any) => {
      this.toast.showSuccess(res.message)
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 700);
      },(err:any)=>{
      this.toast.showWarning(err.error.message)
      });       
    }
  }

  backButton() {
    this.router.navigateByUrl('login');
  }
}












