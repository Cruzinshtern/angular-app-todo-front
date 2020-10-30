// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// // import { Observable } from 'rxjs';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
//
// @Injectable()
// export class ParamInterceptor implements HttpInterceptor {
//   constructor() {  }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authToken = localStorage.getItem('auth_token');
//     req = req.clone({
//       headers: req.headers.set('Authorization', 'Bearer ' + authToken),
//       setHeaders: {
//           Authorization: 'Bearer ' + authToken
//       }
//     });
//     return next.handle(req);
//   }
// }
//
//

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class ParamInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}
