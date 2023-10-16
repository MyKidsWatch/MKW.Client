import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, concatMap } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Store } from '@ngxs/store';
import { UserData } from 'src/app/shared/store/user/user.model';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<boolean> {

  constructor(private userFacade: UserFacade){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userFacade.updateUserInformation();
  }
}
