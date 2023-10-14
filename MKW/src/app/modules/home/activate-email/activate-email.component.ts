import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { SplashScreenService } from 'src/app/core/services/splash-screen.service';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.scss'],
})
export class ActivateEmailComponent  implements OnInit {

  
  public emailKeyCode?: string;
  constructor(private splashScreenService: SplashScreenService, private userFacade: UserFacade) { }

  ngOnInit() {}

  ionViewDidEnter() {

    this.splashScreenService.stop();
  }
  

  submitKeyCode()
  {
    console.log(this.emailKeyCode);
  }
  
}
