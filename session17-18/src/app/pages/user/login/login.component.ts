import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({

    password:new FormControl("",[
      Validators.required
    ]),
    username:new FormControl("",[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    // addresses:new FormControl(),
  })
  constructor() { }

  ngOnInit(): void {
  }
  handleLogin(){
    console.log(this.loginForm.value);
    
  }
  get username(){
    return this.loginForm.get("username")
  }
  get password(){
    return this.loginForm.get("password")
  }

}
