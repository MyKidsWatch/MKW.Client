import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store'
import { UserState } from 'src/app/shared/store/state/user.state';
import { SplashScreenService } from '../services/splash-screen.service';
@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {

  constructor(private store: Store, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    let tokenInfo = this.store.selectSnapshot(UserState.getTokenInfo);

    if(tokenInfo && !! tokenInfo.accessToken)    
      this.router.navigate(['home/feed']);
    

    return of(true);
  }
}
