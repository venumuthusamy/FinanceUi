import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { LoginService } from 'src/app/login/login-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotForm! : FormGroup
  buttonDisabled : boolean = false
  
  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private toast: ToastService,
    private loginService : LoginService,
  ) {}

   ngOnInit(){
 
    this.forgotForm = this.formBuilder.group({
      email : ['' , Validators.required],
    })
        
  }

  onSubmit() {    
    if (this.forgotForm.valid) {
      this.buttonDisabled = true
         this.loginService.forgotPassword(this.forgotForm.value).subscribe((res :any) => {
          this.toast.showSuccess("Reset link sent to your email, please check and proceed further")
          this.router.navigateByUrl('login'); 
          },(err:any)=>{
          this.toast.showWarning(err.error)
          });  
    } else {
      this.toast.showWarning("Please Fill Mandatory Field")
    }
  }

  backButton(){
    this.router.navigateByUrl('/login');
  }
}
