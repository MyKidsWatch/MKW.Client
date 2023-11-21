import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestKeycodeDTO, ResetPasswordDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AccountService } from 'src/app/core/services/account.service';
import { lowerCaseValidator, matchFieldsValidator, numericValidator, specialCharacterValidator, unusedEmail, uppercaseValidator } from 'src/app/core/validators/sign-up.validators';

import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private accountService: AccountService,
    private translateService: TranslateService,
  ) { }

  requestKeycodeForm: FormGroup = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', [Validators.required, Validators.minLength(8), numericValidator, uppercaseValidator, lowerCaseValidator, specialCharacterValidator]],
    rePassword: ['', [Validators.required]],
    keycode: ['', [Validators.required]]

  },
    {
      validator: [matchFieldsValidator('password', 'rePassword')],
    }
  );

  public currentStep: number = 1;

  ngOnInit() {
    this.currentStep = 1;
  }

  public previousPage() {
    if (this.currentStep == 1) {
      this.router.navigate(['auth']);
      this.requestKeycodeForm.reset();
      return;
    }

    this.currentStep--;
  }

  public requestKeycode() {
    let request = new RequestKeycodeDTO();
    request.email = this.requestKeycodeForm.controls['email'].value;
    this.accountService.requestPasswordKeyCode(request)
      .pipe(take(1))
      .subscribe(
        {
          next: (res) => {
            this.currentStep++;
          },
          error: (err) => {
            alert(this.translateService.instant('genericError')); 
          }
        }

      );
  }

  public resetPassword() {
    let request = new ResetPasswordDTO();

    request.email = this.requestKeycodeForm.controls['email'].value;
    request.password = this.requestKeycodeForm.controls['password'].value;
    request.rePassword = this.requestKeycodeForm.controls['rePassword'].value;
    request.keyCode = this.requestKeycodeForm.controls['keycode'].value;

    this.accountService.changePassword(request)
      .pipe(take(1))
      .subscribe(
        {
          next: (res) => {
            this.currentStep++;
          },
          error: (err) => {
            alert(this.translateService.instant('genericError'));
          }
        }

      );;
  }

  public nextStep() {
    switch (this.currentStep) {
      case 1:
        this.requestKeycode();
        break;

      case 2:
        this.resetPassword();
        break;

      case 3:
        this.router.navigate(['auth']);
        this.requestKeycodeForm.reset();
        this.currentStep = 1;
        break;
    }

  }

  isFieldValid(fieldName: string) {
    const formField = this.requestKeycodeForm.controls[fieldName];
    return (formField.invalid && formField.touched)
  }

  isCurrentStepValid() {
    let isValid = false;

    switch (this.currentStep) {
      case 1:
        isValid = this.isRequestKeyCodeFormValid();
        break;
      case 2:
        isValid = this.isChangePasswordFormValid();
        break;
      default:
        isValid = true;
    }

    return isValid;
  }


  isRequestKeyCodeFormValid() {
    return this.requestKeycodeForm.controls['email'].valid;
  }

  isChangePasswordFormValid() {

    return (
      this.requestKeycodeForm.controls['keycode'].valid &&
      this.requestKeycodeForm.controls['password'].valid &&
      this.requestKeycodeForm.controls['rePassword'].valid
    );
  }
}
