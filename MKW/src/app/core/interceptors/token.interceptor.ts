import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, concatMap, map, of, switchMap, take } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/user/user.state';
import { AuthService } from '../services/auth.service';
import { UserSelectors } from 'src/app/shared/store/user/user.selectors';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userFacade: UserFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let routesToSkip = ['assets', 'Authentication', 'register'];

    if(routesToSkip.some(x => request.url.includes(x)))
      return next.handle(request);

    let tokenInfo = this.userFacade.getUserToken();

    if(tokenInfo && tokenInfo.expiresAt && new Date(tokenInfo.expiresAt).getTime() <= Date.now())
      return this.refreshUserToken(request, next);

    let headers = request.headers.append('Authorization', 'Bearer ' + tokenInfo?.accessToken)
    request = request.clone({headers});
    
    return next.handle(request);
  }


  refreshUserToken(request: HttpRequest<unknown>, next: HttpHandler)
  {
    return this.userFacade.refreshUserToken().pipe(switchMap(() =>{
      const updatedTokenInfo = this.userFacade.getUserToken();
      let headers = request.headers.append('Authorization', 'Bearer ' + updatedTokenInfo?.accessToken)
      request = request.clone({headers});
      return next.handle(request)
    }))
  }
}
