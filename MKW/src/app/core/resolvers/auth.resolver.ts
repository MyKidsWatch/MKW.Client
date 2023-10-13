import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store'
import { UserState } from 'src/app/shared/store/user/user.state';
import { SplashScreenService } from '../services/splash-screen.service';
import { UserSelectors } from 'src/app/shared/store/user/user.selectors';
import { UserFacade } from 'src/app/shared/facades/user.facade';
@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {

  constructor(private router: Router, private userFacade: UserFacade){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    let tokenInfo = this.userFacade.getUserToken();

    if(tokenInfo && !!tokenInfo.accessToken)    
      this.router.navigate(['home/feed']);
    

    return of(true);
  }
}
