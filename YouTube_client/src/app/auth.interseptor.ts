import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3';

  private apiKey = 'AIzaSyCk-HifH0u_bSW2Tr1hqjFZ8Cd_C4nDs68';

  private apiKey3 = 'AIzaSyDxLxFUndzPpOriO8Cuhk4KZQ47EBt0uxk';

  private apiKey2 = 'AIzaSyBy73ciU0Mh6W1oHiQlH_-LfwuGZ1DupVQ';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      url: `${this.apiUrl}/${request.url}`,
      params: request.params.set('key', this.apiKey),
    });

    return next.handle(modifiedRequest);
  }
}
