import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SplashScreenService } from 'src/app/core/services/splash-screen.service';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  subscription = new Subscription();
  isUserAdminSubscription = new Subscription();

  public isUserAdmin: boolean = false;
  constructor(private platform: Platform, private splashScreenService: SplashScreenService, private userFacade: UserFacade) { }

  
  ngOnInit() {
   
  }

  ionViewDidEnter() {

    this.splashScreenService.stop();
    
    this.isUserAdminSubscription = this.userFacade.getUserAdminState()
    .subscribe(res => {
      console.log("is user admin: " + res); 
      this.isUserAdmin = res
    });
    
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, (response) =>{
      document.addEventListener('backbutton', (event) =>{
        event.preventDefault();
        event.stopPropagation();
      }, false);
    })
  }
  
  ionViewWillLeave() {
      this.subscription.unsubscribe();
      this.isUserAdminSubscription.unsubscribe();
  }

}
