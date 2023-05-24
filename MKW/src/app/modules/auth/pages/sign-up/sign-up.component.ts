import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { relative } from 'path';
import { Keyboard } from '@capacitor/keyboard';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  name = new FormControl('');

  public currentStep: number = 1;
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentStep = 1;

  }


  public nextStep()
  {
      if(this.currentStep != 3)
        this.currentStep++;
      else
        this.router.navigate(['auth']);
  }

  public previousStep()
  {
      if(this.currentStep == 1)
        this.router.navigate(['auth'])
      else
        this.currentStep--;
      
  }
}
