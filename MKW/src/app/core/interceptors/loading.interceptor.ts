import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, map, retry, tap } from 'rxjs';
import { LoadingBarService } from '../services/loading-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingBarService: LoadingBarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if(request.url.includes(environment.apiBaseUrl))
      this.loadingBarService.setLoadingBar(true);
    
    return next.handle(request).pipe(finalize(() =>{
        this.loadingBarService.setLoadingBar(false);
    }));
  }
}
