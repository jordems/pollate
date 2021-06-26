import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /**
     * TODO just hard coded for testing
     */
    return next.handle(
      req.clone({
        headers: req.headers.set('x-user-id', '60b32b28598a9e449844e797'),
      })
    );
  }
}
