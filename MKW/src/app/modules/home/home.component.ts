import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SplashScreenService } from 'src/app/core/services/splash-screen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  subscription = new Subscription();

  constructor(private platform: Platform, private splashScreenService: SplashScreenService) { }

  
  ngOnInit() {
    

  }

  ionViewDidEnter() {

    this.splashScreenService.stop();

    this.subscription = this.platform.backButton.subscribeWithPriority(9999, (response) =>{
      document.addEventListener('backbutton', (event) =>{
        event.preventDefault();
        event.stopPropagation();
      }, false);
    })
  }
  
  ionViewWillLeave() {
      this.subscription.unsubscribe();
  }

}
