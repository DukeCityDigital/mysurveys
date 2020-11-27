import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "@app/core/models/user";
import { SetRole } from "@app/core/helpers/set-role";
import { throwError } from "rxjs/internal/observable/throwError";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private refreshTokenTimeout;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public localhost(): boolean {
    return (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.hostname === "apptest1.com"
    );
  }

  // TODO remove
  test() {
    return this.http.get<User>(`${environment.apiUrl}/test`).subscribe((r) => {
      console.log(r);
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(
        `${environment.apiUrl}/auth/login`,
        {
          email,
          password,
        }
        // { withCredentials: true }
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user));
          let u = JSON.stringify(user);
          localStorage.setItem("access_token", JSON.parse(u).access_token);
          user = SetRole(user);
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  refreshToken() {
    return this.http.get<any>(`${environment.apiUrl}/refresh`).pipe(
      catchError((err) => {
        // console.log("error caught in service");
        console.error(err);
        //Handle the error here
        this.logout();
        return throwError(err); //Rethrow it back to component
      }),
      map((user) => {
        localStorage.setItem("access_token", user.access_token);
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  /**
   * TODO post to endpoint to revoke
   */
  logout() {
    // remove user from local storage to log user out
    // this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
    //
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    // this.router.navigate(["/"]);
  }
  // helper methods

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(
      atob(this.userValue.access_token.split(".")[1])
    );
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    //test va
    // const timeout = 45 * 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  resendVerificationCode(email: string) {
    return this.http.post<User>(
      `${environment.apiUrl}/auth/resend_verification_email`,
      {
        email: email,
      }
    );
  }

  quickLogin(user: User) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem("user", JSON.stringify(user));
    let u = JSON.stringify(user);
    localStorage.setItem("access_token", JSON.parse(u).access_token);
    user = SetRole(user);
    // this.startRefreshTokenTimer();
    this.userSubject.next(user);
    return user;
  }

  update(id, params) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
      map((x) => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem("user", JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }
}
