import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Injectable({
  providedIn: 'root'
})
export class ChildResolver implements Resolve<boolean> {
  constructor(private userFacade: UserFacade) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userFacade.updateUserChildren();
  }
}
