import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginForm = new FormGroup({
      loginCredential: new FormControl(''),
      password: new FormControl('')
  });

  constructor() { }

  ngOnInit() {

    
  }

}
