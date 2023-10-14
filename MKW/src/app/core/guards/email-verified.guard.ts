import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { UserSelectors } from 'src/app/shared/store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifiedGuard implements CanActivate {
  constructor(private userFacade: UserFacade, private router: Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userInfo = this.userFacade.getUserState();

      console.log("Is user email verified guard")
      if(!!userInfo && !!userInfo.isEmailVerified)
        return true;
      
      this.router.navigate(['home/activate-email']);
      return false;
  }
  
}
