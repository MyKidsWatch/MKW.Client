import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/state/user.state';
import { Router } from '@angular/router';
import { SetTokenInfo } from 'src/app/shared/store/actions/user.action';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('Authentication/refresh'))
    {
        let tokenInfo = this.store.selectSnapshot(UserState.getTokenInfo);
        let headers = request.headers.append('Authorization', 'Bearer ' + tokenInfo?.refreshToken)
        request = request.clone({headers});
    }

    return next.handle(request).pipe(
      catchError((error) => {

        this.store.dispatch(new SetTokenInfo(undefined))
        this.router.navigateByUrl('auth'); 
        
        throw throwError(error);
      })
    );    
  }
}
