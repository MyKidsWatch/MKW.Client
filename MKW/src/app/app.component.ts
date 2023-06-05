import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SplashComponent } from './shared/components/splash/splash.component';

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
  constructor(private translateService: TranslateService) {
    const languageToUse = this.translateService.getDefaultLang();
    this.translateService.use(languageToUse);
  }
}
