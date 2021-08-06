import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { NgAuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private ngAuthService: NgAuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.angularFireAuth.idToken.pipe(
      first(),
      switchMap((token) =>
        this.ngAuthService.user$.pipe(
          first(),
          map((user) => ({ user, token }))
        )
      ),
      switchMap(({ user, token }) => {
        const headers = request.headers
          .set('x-user-id', user?.uid ?? '')
          .set('Authorization', token ? `Bearer ${token}` : '');

        return next.handle(request.clone({ headers }));
      })
    );
  }
}
