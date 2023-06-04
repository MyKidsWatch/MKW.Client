import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, concatMap, map, of, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/state/user.state';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('assets'))
      return next.handle(request);

    if(!request.url.includes('Authentication') && !request.url.includes('register'))
    {
        return this.store.select(UserState.getTokenInfo).pipe(concatMap(tokenInfo =>{
            
            if(tokenInfo && tokenInfo.expiresAt && new Date(tokenInfo.expiresAt).getTime() <= Date.now())
            { 
                return this.authService.refresh().pipe(switchMap(response =>{
                  const updatedTokenInfo = this.store.selectSnapshot(UserState.getTokenInfo);
                  let headers = request.headers.append('Authorization', 'Bearer ' + updatedTokenInfo?.accessToken)
                  request = request.clone({headers});
                  return next.handle(request)
                }))
            }
            else
            {
              let headers = request.headers.append('Authorization', 'Bearer ' + tokenInfo?.accessToken)
              request = request.clone({headers});
              return next.handle(request);
            }
        }));        
    }
    else
    {
      return next.handle(request);
    }
    

  }
}
