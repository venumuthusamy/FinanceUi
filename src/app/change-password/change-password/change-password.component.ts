import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import {strongPasswordValidator} from 'src/shared/custom-validators'
import { LoginService } from 'src/app/login/login-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [DatePipe],
})
export class ChangePasswordComponent {

  addForm!: FormGroup;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private datePipe: DatePipe,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {
  
  }

  ngOnInit() {
      this.addForm = this.fb.group({
        currentPassword: [null, Validators.required],
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
    
    const rawvalue = this.addForm.getRawValue()
  
    if (this.addForm.invalid) {
      this.toast.showWarning("Please Fill Mandatory Field")
      return;
    }else{
      this.loginService.updateChangePassword( rawvalue).subscribe((res :any) => {
      this.toast.showSuccess(res.message)
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 700);
      },(err:any)=>{
      this.toast.showWarning(err.error)
      });       
    }
  }

  backButton() {
    this.router.navigateByUrl('dashboard');
  }

}











