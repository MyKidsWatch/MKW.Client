import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, concatMap } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Store } from '@ngxs/store';
import { SetUserData } from 'src/app/shared/store/actions/user.action';
import { UserData } from 'src/app/shared/store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<boolean> {

  constructor(private accountService: AccountService, private store: Store){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.accountService.getUserInfo().pipe(concatMap((data) =>{

          let userInformation = data.content![0];

          let userData = new UserData();
          userData.isEmailVerified = userInformation.emailConfirmed;
          userData.isPremium = false;
          userData.username = userInformation.userName!;
          userData.birthDate = userInformation.associatedWithPerson?.birthDate;
          userData.firstName = userInformation.firstName!;
          userData.lastName = userInformation.lastName!;
        
          return this.store.dispatch(new SetUserData(userData));
      }))
  }
}
