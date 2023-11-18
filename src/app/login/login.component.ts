import { Component } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: FormGroup; 
  
  errorMsg="";

  
  constructor(private formBuilder : FormBuilder,private http:HttpClient,private router:Router,private auth:AuthService){

  }
  ngOnInit():void {
    this.loginForm = new FormGroup({
      emailadd: new FormControl(null , [Validators.required,Validators.email]),
      loginpassword : new FormControl(null,[Validators.required,Validators.maxLength(5)])
    })
  }
  login(){
    console.log(this.loginForm);
   
    if(this.loginForm.get('emailadd')?.value.trim().length===0){
      this.errorMsg="Username is required";
    }else if(this.loginForm.get('loginpassword')?.value.trim().length===0){
      this.errorMsg="Password is required";
    }else{
      this.errorMsg="";
      let res=this.auth.login(this.loginForm.get('emailadd')?.value,this.loginForm.get('loginpassword')?.value)
      if(res===200){
          this.router.navigate(['/product']);
      }
      if(res===403){
        this.errorMsg="Inavlid Capatcha";
  
        }
    }
    

}

}
