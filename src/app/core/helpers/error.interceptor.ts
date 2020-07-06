import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService as AuthenticationService } from "@app/core/services/auth.service";
import { AlertService } from "../components/_alert";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log("err handler redir + logout?", err);
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.alertService.error("There has been an error");
          this.authenticationService.logout();
          // location.reload(true);
        } else if (err.status === 403) {
          this.alertService.error(err.error.message);
          this.router.navigate(["/home"]);
        }
        this.alertService.error(err.error.message);

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
