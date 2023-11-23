import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from 'src/app/core/services/splash-screen.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent  implements OnInit {

  constructor(private splashScreenService: SplashScreenService) { }

  ngOnInit() {

    this.splashScreenService.stop();
  }

}
