import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommentFacade } from 'src/app/shared/facades/comment.facade';

@Injectable({
  providedIn: 'root'
})
export class CommentResolver implements Resolve<boolean> {
  constructor(private commentFacade: CommentFacade) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let value = route.params['id'];
    return this.commentFacade.setReviewComments(value);

  }
}
