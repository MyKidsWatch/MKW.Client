import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, concatMap, map, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/state/user.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!request.url.includes('Authentication') && !request.url.includes('register'))
    {
        return this.store.select(UserState.getTokenInfo).pipe(concatMap(tokenInfo =>{
            let headers = request.headers.append('Authorization', 'Bearer ' + tokenInfo?.accessToken)
            request = request.clone({headers});
            
            return next.handle(request);
        }));        
    }
    else
    {
      return next.handle(request);
    }
    

  }
}
