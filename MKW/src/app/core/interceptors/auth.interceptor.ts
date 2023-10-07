import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetTokenInfo } from 'src/app/shared/store/user/user.action';
import { TokenDTOBaseResponseDTO } from '../proxies/mkw-api.proxy';
import { TokenInfo } from 'src/app/shared/store/user/user.model';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return next.handle(request).pipe(map(event => {
      if (request.url.includes('Authentication') && event instanceof HttpResponse && event.status == 200) {

        let responseBody = event.body as Blob;
        responseBody.text().then((response) =>{

            let tokenInformationDto: TokenDTOBaseResponseDTO = JSON.parse(response as string);
            let tokenInfo: TokenInfo = new TokenInfo();

            tokenInfo.accessToken = tokenInformationDto!.content![0].accessToken!;
            tokenInfo.refreshToken = tokenInformationDto!.content![0].refreshToken!;
            tokenInfo.expiresAt = new Date(tokenInformationDto!.content![0].accessTokenExpiration!);

            this.store.dispatch(new SetTokenInfo(tokenInfo))
        });
      }   

      return event;
    }));
  }
}
