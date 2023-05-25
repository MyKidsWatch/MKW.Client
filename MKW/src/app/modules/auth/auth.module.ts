import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountClient, AuthenticationClient, AuthorizationClient } from 'src/app/core/proxies/mkw-api.proxy';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    StepperComponent,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AccountClient,
    AccountService,
    AuthenticationClient,
    AuthService
  ]
})
export class AuthModule { }
