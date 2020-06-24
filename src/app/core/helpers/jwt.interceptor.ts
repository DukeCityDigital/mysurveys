import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService as AuthenticationService } from "@app/core/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    const idToken = localStorage.getItem("access_token");
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
