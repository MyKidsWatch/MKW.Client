import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserDTO, ICreateUserDTO, IPersonOnCreateUserDTO, PersonOnCreateUserDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AccountService } from 'src/app/core/services/account.service';
import { lowerCaseValidator, matchFieldsValidator, numericValidator, unusedUserName, uppercaseValidator, specialCharacterValidator } from 'src/app/core/validators/sign-up.validators';
import { unusedEmail } from 'src/app/core/validators/sign-up.validators';
import { take } from 'rxjs';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public isLoadingContent: boolean = false;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private translateService: TranslateService,
    private toastService: ToastService,
    public loadingBarService: LoadingBarService
  ) { }

  registrationForm: FormGroup = this.formBuilder.group({
    userName: ['', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)], asyncValidators: [unusedUserName(this.accountService)], updateOn: 'blur' }],
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
    this.setLoadingBar();
  }
  setLoadingBar() {
    this.loadingBarService.getLoadingBar().subscribe((response) => {
      this.isLoadingContent = response as boolean;
    })
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
          this.toastService.showError(this.translateService.instant('genericError'));
        }
      })
  }

  public nextStep(currentStep: number) {

    switch (currentStep) {
      case 1:
        this.currentStep = 2;
        break;
      case 2:
        this.submitForm();
        break;
      case 3:
        this.router.navigate(['auth']);
        this.registrationForm.reset();
        this.currentStep = 1;
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
