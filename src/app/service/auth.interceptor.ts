import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //if user not authenticated
    if (!this.authService.token) {
      return next.handle(request);
    }
    // else add bearer token
    const reqWithAuth = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + this.authService.token
      ),
    });
    return next.handle(reqWithAuth);
  }
}
