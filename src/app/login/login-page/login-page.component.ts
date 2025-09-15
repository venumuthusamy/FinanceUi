import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { LoginService } from '../login-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    
  loginForm! : FormGroup
  backgroundImages: string[] = [
    'url("assets/image1.JPG")',
    'url("assets/image2.JPG")',
    'url("assets/image3.JPG")',
  ];
  currentImageIndex = 0;
  
  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private toast: ToastService,
    private loginService : LoginService
  ) {}

   ngOnInit(){
 
    this.loginForm = this.formBuilder.group({
      username : ['' , Validators.required],
      password : ['' , Validators.required],
    })
        
    this.setBackgroundImage();

    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
      this.setBackgroundImage();
    }, 10000);
  }

  onSubmit() {

    if(this.loginForm.valid){
   
      this.loginService.userLogin(this.loginForm.value).subscribe((res :any)=>{
      localStorage.setItem("username",this.loginForm.value.username)
      localStorage.setItem("token",res.token)
      this.router.navigateByUrl('/dashboard');
      },(err:any)=>{
         this.toast.showWarning(err.error)
      })
    }else {
      this.toast.showWarning("Please Fill Mandatory Field")
    }
  }

   setBackgroundImage() {
    const container = document.querySelector('.login-container') as HTMLElement;
    if (container) {
      container.style.backgroundImage = this.backgroundImages[this.currentImageIndex];
    }
  }

  forgotPassword(){
    this.router.navigateByUrl('/forgot-password');
  }
}


