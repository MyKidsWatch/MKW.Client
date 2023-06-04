import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  subscription = new Subscription();

  constructor(private platform: Platform) { }

  
  ngOnInit() {
    

  }

  ionViewDidEnter() {
    console.log("Entrei");
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, (response) =>{
      document.addEventListener('backbutton', (event) =>{
        event.preventDefault();
        event.stopPropagation();
      }, false);
    })
  }
  
  ionViewWillLeave() {
      console.log("Sai");
      this.subscription.unsubscribe();
  }

}
