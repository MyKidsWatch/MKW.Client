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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let routesToSkip = ['assets', 'Authentication', 'register'];

    if(routesToSkip.some(x => request.url.includes(x)))
      return next.handle(request);


    let tokenInfo = this.store.selectSnapshot(UserState.getTokenInfo);

    if(tokenInfo && tokenInfo.expiresAt && new Date(tokenInfo.expiresAt).getTime() <= Date.now())
    { 
      return this.authService.refresh().pipe(switchMap(response =>{
          const updatedTokenInfo = this.store.selectSnapshot(UserState.getTokenInfo);
          let headers = request.headers.append('Authorization', 'Bearer ' + updatedTokenInfo?.accessToken)
          request = request.clone({headers});
          return next.handle(request)
        }))
    }

    let headers = request.headers.append('Authorization', 'Bearer ' + tokenInfo?.accessToken)
    request = request.clone({headers});
    
    return next.handle(request);
  }
}
