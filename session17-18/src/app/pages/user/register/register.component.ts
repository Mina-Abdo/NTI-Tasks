import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthInterceptor } from 'src/app/prviders/interceptors/auth.interceptor';
import { AuthService } from 'src/app/prviders/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errMsg:any=""
  registerForm = new FormGroup({
    name:new FormControl("",[
      Validators.minLength(3),
      Validators.required,
      Validators.maxLength(20)
    ]),
    email:new FormControl("",[
      Validators.email,
      Validators.required
    ]),
    password:new FormControl("",[
      Validators.required
    ]),
    username:new FormControl("",[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    userImage:new FormControl("")
    // addresses:new FormControl(),
  })
  constructor(private _auth:AuthService) {}

  ngOnInit(): void {
  }
  handleRegister(){
    let userData:User = this.registerForm.value
    this._auth.register(userData).subscribe(
      res=>{console.log(res);
      },
      e=>{
        if(e.error.message.includes("email")) this.errMsg.email=e.error.message
        if(e.error.message.includes("username")) this.errMsg.username=e.error.message
        if(e.error.message.includes("password")) this.errMsg.password=e.error.message
        if(e.error.message.includes("name")) this.errMsg.name=e.error.message
      },
      ()=>{}
    )
    
  }
  get name(){
    return this.registerForm.get("name")
  }
  get email(){
    return this.registerForm.get("email")
  }
  get username(){
    return this.registerForm.get("username")
  }
  get password(){
    return this.registerForm.get("password")
  }

}
