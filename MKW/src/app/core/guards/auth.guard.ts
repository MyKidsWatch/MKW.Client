import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, interval, map } from 'rxjs';
import { SplashScreenService } from '../services/splash-screen.service';
import { tick } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { TokenInfo } from 'src/app/shared/store/models/user.model';
import { UserState } from 'src/app/shared/store/state/user.state';
import { SetTokenInfo } from 'src/app/shared/store/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let tokenInfo = this.store.selectSnapshot(UserState.getTokenInfo);

    if(!!tokenInfo)
      return true;
    
    this.router.navigateByUrl('auth');

    return !!tokenInfo;
  }
  

}
