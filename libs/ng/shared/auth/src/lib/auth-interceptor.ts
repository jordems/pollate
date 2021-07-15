import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgAuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly ngAuthService: NgAuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { user$ } = this.ngAuthService;

    console.log('h123');
    if (!user$) {
      return next.handle(req);
    }

    return this.ngAuthService.user$.pipe(
      switchMap((user) => {
        console.log('he');
        return next.handle(
          req.clone({
            headers: req.headers
              .set('x-user-id', user?._id ?? '')
              .set('x-firebase-token', this.ngAuthService.idToken ?? ''),
          })
        );
      })
    );
  }
}
