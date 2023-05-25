import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILoginRequestDTO } from '../../models/login-request';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginForm = new FormGroup({
      credential: new FormControl(''),
      password: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {

    
  }

  submit()
  {
      let credentials: ILoginRequestDTO = {credential: this.loginForm.controls['credential'].value!, password: this.loginForm.controls['password'].value!}
      this.authService.authenticate(credentials).subscribe({
        next: () =>{
          console.log("logou")
        },
        error: () =>{
          console.log("Deu erro")
        }
      })
  }

}
