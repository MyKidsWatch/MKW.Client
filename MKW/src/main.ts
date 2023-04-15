import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { API_BASE_URL, MovieClient } from './app/shared/core/proxies/mkw-api.proxy';
import { HttpClientModule} from '@angular/common/http';
import { CoreModule } from './app/shared/core/core.module';

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}), HttpClientModule, CoreModule),
    provideRouter(routes),
    {provide: API_BASE_URL, useValue: environment.apiBaseUrl},
    
  ],
});
