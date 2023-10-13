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
import { UserState } from 'src/app/shared/store/user/user.state';
import { Router } from '@angular/router';
import { UserSelectors } from 'src/app/shared/store/user/user.selectors';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private userFacade: UserFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!request.url.includes('Authentication/refresh'))
        return next.handle(request);

    let tokenInfo = this.userFacade.getUserToken();
    let headers = request.headers.append('Authorization', 'Bearer ' + tokenInfo?.refreshToken)
    request = request.clone({headers});

    return next.handle(request).pipe(
      catchError((error) => {

        this.userFacade.logOffUser();
        this.router.navigateByUrl('auth'); 
        
        throw throwError(error);
      })
    );    

    
  }
}
