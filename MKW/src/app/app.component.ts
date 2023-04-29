import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SplashComponent } from './components/splash/splash.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    TranslateModule,
    SplashComponent
  ],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }
}
