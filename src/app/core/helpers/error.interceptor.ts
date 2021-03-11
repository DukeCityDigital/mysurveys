import { Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { AuthService } from "@app/core/services/auth.service";
import { AlertService } from "../components/_alert";
import { Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  authService = AuthService;
  static alertService;
  // alertService = AlertService;
  constructor(
    private state: RouterStateSnapshot,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private injector: Injector
  ) {
    ErrorInterceptor.alertService = alertService;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        if (error.status == 403) {
          errorMessage = "You have been logged out.  Please log back in";

          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }
        // window.alert(errorMessage);
        // return false
        console.log(error);
        // const alertService = this.injector.get(AlertService);
        let msg = error.error.message || "There has been an error";
        this.alertService.error(msg, { autoClose: true });
        return throwError(error);
      })
    );
  }
}
