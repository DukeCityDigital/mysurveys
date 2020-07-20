import { Injectable } from "@angular/core";
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
  constructor(
    private state: RouterStateSnapshot,
    private router: Router,
    public alertService: AlertService,
    private authenticationService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const alertService = AlertService;
    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
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
        // this.alertService.error("There has been an error");

        return throwError(error);
      })
    );
    // .pipe(
    //   catchError((err) => {
    //     console.log("err handler redir + logout?", err);

    //     if (err.status === 401) {
    //       // auto logout if 401 response returned from api
    //       this.alertService.error("There has been an error");
    //       this.authenticationService.logout();
    //       // location.reload(true);
    //     } else if (err.status === 403 || err.status === 404) {
    //       this.router.navigate(["/"], {
    //         queryParams: { returnUrl: this.state.url },
    //       });
    //       if (this.authenticationService) {
    //       }
    //       // this.alertService.error(err.error.message);
    //       this.router.navigate(["/"], {
    //         queryParams: { returnUrl: this.state.url },
    //       });
    //     }
    //     this.alertService.error(err.message, { autoClose: true });

    //     const error = err.error.message || err.statusText;
    //     return throwError(error);
    //   })
    // );
  }
}
