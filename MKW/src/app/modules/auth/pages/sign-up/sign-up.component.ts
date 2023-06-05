import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserDTO, ICreateUserDTO, IPersonOnCreateUserDTO, PersonOnCreateUserDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AccountService } from 'src/app/core/services/account.service';
import { lowerCaseValidator, matchFieldsValidator, numericValidator, unusedUserName, uppercaseValidator, specialCharacterValidator } from 'src/app/core/validators/sign-up.validators';
import { unusedEmail } from 'src/app/core/validators/sign-up.validators';
import { take } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { }

  registrationForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(6)], [unusedUserName(this.accountService)]],
    password: ['', [Validators.required, Validators.minLength(8), numericValidator, uppercaseValidator, lowerCaseValidator, specialCharacterValidator]],
    rePassword: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    email: ['', { validators: [Validators.required, Validators.email], asyncValidators: [unusedEmail(this.accountService)], updateOn: 'blur' }],
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

  public registerAccount() {
    const personDetails: IPersonOnCreateUserDTO = {
      birthDate: new Date(this.registrationForm.controls['birthDate'].value),
      genderId: this.registrationForm.controls['gender'].value
    };

    const createUserInfo: ICreateUserDTO = {
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

  submitForm() {
    this.registerAccount()
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        this.currentStep++;
      },
      error: (err) => {
        alert("Erro durante a realização do cadastro");
      }
    })
  }

  public nextStep() {
    switch (this.currentStep) {
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

  public previousStep() {
    if (this.currentStep == 1) {
      this.router.navigate(['auth']);
      return;
    }

    this.currentStep--;
  }

  isCurrentStepValid() {
    let isValid = false;

    switch (this.currentStep) {
      case 1:
        isValid = this.isFirstStepValid();
        break;
      case 2:
        isValid = this.isSecondStepValid();
        break;
      default:
        isValid = true;
    }

    return isValid;
  }

  isFieldValid(fieldName: string) {
    const formField = this.registrationForm.controls[fieldName];
    return (formField.invalid && formField.touched)
  }

  public isFirstStepValid() {
    return (
      this.registrationForm.controls['firstName'].valid &&
      this.registrationForm.controls['lastName'].valid &&
      this.registrationForm.controls['birthDate'].valid &&
      this.registrationForm.controls['gender'].valid
    )
  }

  public isSecondStepValid() {
    return (
      this.registrationForm.controls['userName'].valid &&
      this.registrationForm.controls['email'].valid &&
      this.registrationForm.controls['password'].valid &&
      this.registrationForm.controls['rePassword'].valid
    )
  }
}
