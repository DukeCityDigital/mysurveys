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
import { Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private state: RouterStateSnapshot,
    private router: Router,
    public alertService: AlertService,
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
        } else if (err.status === 403 || err.status === 404) {
          // this.alertService.error(err.error.message);
          this.authenticationService.logout();
          this.router.navigate(["/"], {
            queryParams: { returnUrl: this.state.url },
          });
        }
        this.alertService.error(err.message, { autoClose: true });

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
