import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SplashScreenService } from '../services/splash-screen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private splashScreenService: SplashScreenService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // this.splashScreenService.subscribe(true);

      for(let i = 0; i <= 10000 ; i++)
      {
        if(i === 10000)
          console.log(i);
      }

      this.splashScreenService.stop();
      return true;
  }
  
}
