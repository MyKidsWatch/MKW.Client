import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILoginRequestDTO } from '../../models/login-request';
import { error } from 'console';
import { Route, Router } from '@angular/router';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit, OnDestroy {

  public isLoadingContent: boolean = false;
  loginForm = new FormGroup({
      credential: new FormControl(''),
      password: new FormControl('')
  });

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private translateService: TranslateService,
    public loadingBarService: LoadingBarService,
    public userFacade: UserFacade,
  ) { }

  ngOnInit() {   
    this.setLoadingBar();   
  } 

  ngOnDestroy(): void {
  }

  setLoadingBar() {
    this.loadingBarService.getLoadingBar().subscribe((response) =>{
      this.isLoadingContent = response as boolean;
    })
  }

  submit() {
    let credentials: ILoginRequestDTO = {
      credential: this.loginForm.controls['credential'].value!,
      password: this.loginForm.controls['password'].value!
    }

    this.userFacade.loginUser(credentials.credential, credentials.password)
      .pipe(
        switchMap(res => this.userFacade.updateUserInformation())
      )
      .subscribe({
        next: () => {
          this.router.navigate(['home/feed']);
        },
        error: (err) => {
          if (err.status === 401) {
            alert(this.translateService.instant('userOrPasswordIncorrect'));          
            return;
          }

          alert(this.translateService.instant('genericError'));          
        }
      })
  }

  

}
