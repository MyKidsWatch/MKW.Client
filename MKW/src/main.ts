import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { API_BASE_URL, AuthenticationClient, MovieClient } from './app/core/proxies/mkw-api.proxy';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './app/core/core.module';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './app/shared/store/user/user.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { TokenInterceptor } from './app/core/interceptors/token.interceptor';
import { LoadingInterceptor } from './app/core/interceptors/loading.interceptor';
import { RefreshTokenInterceptor } from './app/core/interceptors/refresh-token.interceptor';

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AuthenticationClient },
    importProvidersFrom
      (
        IonicModule.forRoot({animated: false}), 
        HttpClientModule, 
        CoreModule, 
        CommonModule,
        NgxsModule.forRoot([UserState]),
        NgxsStoragePluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
      ),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor ,
      multi: true   
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true   
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true   
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true   
    },
    
    {provide: API_BASE_URL, useValue: environment.apiBaseUrl},
    
  ],
});
