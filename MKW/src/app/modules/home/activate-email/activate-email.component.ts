import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { take, tap } from 'rxjs';
import { SplashScreenService } from 'src/app/core/services/splash-screen.service';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.scss'],
})
export class ActivateEmailComponent  implements OnInit {
  public emailKeyCode?: string;
  public isUserEmailVerified: boolean = false;

  constructor(
    private splashScreenService: SplashScreenService, 
    private userFacade: UserFacade, 
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    let userData = this.userFacade.getUserState();

    if(userData == undefined || !userData)
      return;

    if(userData.isEmailVerified == true)
      this.router.navigate(['home/feed']);

    this.isUserEmailVerified = userData.isEmailVerified!;
  }

  ionViewDidEnter() {
    this.splashScreenService.stop();
  }
  

  submitKeyCode() {
    if(this.emailKeyCode)
      this.activeUserEmail();
  }
  

  activeUserEmail() {
    this.userFacade.activateUserEmail(this.emailKeyCode!)
    .pipe(take(1))
    .subscribe({
      next: () =>{
        this.isUserEmailVerified = true;
      },
      error: (err) =>{
        alert(this.translateService.instant('emailSendingError'));
      }
    })
  }

  goToMainApplication() {
    this.router.navigate(['home/feed']);
  }
}
