import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReviewFacade } from 'src/app/shared/facades/review.facade';

@Injectable({
  providedIn: 'root'
})
export class ReviewResolver implements Resolve<boolean> {

  constructor(private reviewFacade: ReviewFacade){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    let value = route.params['id'];
    return this.reviewFacade.setCurrentReview(value);
  }
}
