import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.startsWith(environment.tavernApi)) {
      return from(this._authService.getAccessToken().then(token => {

          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const authReq = request.clone({ headers });

          return next.handle(authReq).pipe(tap(_ => { }, error => {
              var responseError = error as HttpErrorResponse;
              if (responseError && (responseError.status === 401 || responseError.status === 403)) {
                  this._router.navigate(["/unauthorized"]);
              }
          })).toPromise();
      }));
    } else {
        return next.handle(request);
    }
  }
}
