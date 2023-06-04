import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { relative } from 'path';
import { Keyboard } from '@capacitor/keyboard';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserDTO, ICreateUserDTO, IPersonOnCreateUserDTO, PersonOnCreateUserDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { userInfo } from 'os';
import { AccountService } from 'src/app/core/services/account.service';
import { Observable } from 'rxjs'
import { lowerCaseValidator, matchFieldsValidator, numericValidator, unusedUserName, uppercaseValidator  } from 'src/app/core/validators/sign-up.validators';
import { unusedEmail } from 'src/app/core/validators/sign-up.validators';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder, private accountService: AccountService) { }
  
  registrationForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(6)], [unusedUserName(this.accountService)]],
    password: ['', [Validators.required, Validators.minLength(8), numericValidator, uppercaseValidator, lowerCaseValidator]],
    rePassword: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [unusedEmail(this.accountService)]],
    birthDate: ['', [Validators.required]],
    gender: ['', [Validators.required]]
  },
  {

    validator: [matchFieldsValidator('password', 'rePassword')],
    
  }
  );

  public currentStep: number = 1;

  ngOnInit() {
    this.currentStep = 1;
  }


  public registerAccount()
  {
      let personDetails: IPersonOnCreateUserDTO = {
        birthDate: new Date(this.registrationForm.controls['birthDate'].value),
        genderId: this.registrationForm.controls['gender'].value
      };

      let createUserInfo : ICreateUserDTO = {
        firstName: this.registrationForm.controls['firstName'].value,
        lastName: this.registrationForm.controls['lastName'].value,
        userName: this.registrationForm.controls['userName'].value,
        email: this.registrationForm.controls['email'].value,
        password: this.registrationForm.controls['password'].value,
        rePassword: this.registrationForm.controls['rePassword'].value,
        personDetails: new PersonOnCreateUserDTO(personDetails)
      }

      return this.accountService.registerAccount(new CreateUserDTO(createUserInfo));

  }

  submitForm()
  {
      this.registerAccount().subscribe({
        next: (res) =>{
          this.currentStep++;
        },
        error: (err) =>{
          alert("Erro durante a realização do cadastro");
        }
      })
  }

  public nextStep()
  {
      switch(this.currentStep)
      {
          case 2:
            this.submitForm();
            break;
          case 3:
            this.router.navigate(['auth']);
            this.registrationForm.reset();
            this.currentStep = 1;
            break;
          default:
            this.currentStep++;
            break;
      }
  }

  public previousStep()
  {
      if(this.currentStep == 1)
        this.router.navigate(['auth'])
      else
        this.currentStep--;
  }

  isCurrentStepValid()
  {
      let isValid = false;
      switch(this.currentStep)
      {
        case 1:
          isValid = this.isFirstStepValid();
          break;
        case 2:
          isValid = this.isSecnondStepValid();
          break;
        default:
          isValid = true;
      }

      return isValid;
  }

  isFieldValid(fieldName: string)
  {
      let formField = this.registrationForm.controls[fieldName];
      return (formField.invalid && formField.touched)
  }
  public isFirstStepValid()
  {
      return (
        this.registrationForm.controls['firstName'].valid &&
        this.registrationForm.controls['lastName'].valid &&
        this.registrationForm.controls['birthDate'].valid &&
        this.registrationForm.controls['gender'].valid )
  }

  public isSecnondStepValid()
  {
      return (
        this.registrationForm.controls['userName'].valid &&
        this.registrationForm.controls['email'].valid &&
        this.registrationForm.controls['password'].valid &&
        this.registrationForm.controls['rePassword'].valid)
  }

}
