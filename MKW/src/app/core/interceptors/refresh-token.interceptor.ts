import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/state/user.state';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('assets'))
      return next.handle(request);

    if(request.url.includes('Authentication/refresh'))
    {
        let tokenInfo = this.store.selectSnapshot(UserState.getTokenInfo);
        let headers = request.headers.append('Authorization', 'Bearer ' + tokenInfo?.refreshToken)
        request = request.clone({headers});
        return next.handle(request)
    }
    else
    {
      return next.handle(request);
    }
  }
}
