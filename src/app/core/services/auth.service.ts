import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { User } from "@app/core/models/user";
import { SetRole } from "@app/core/helpers/set-role";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );

    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // TODO remove
  test() {
    return this.http.get<User>(`${environment.apiUrl}/test`).subscribe((r) => {
      console.log(r);
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user));
          let u = JSON.stringify(user);
          localStorage.setItem("access_token", JSON.parse(u).access_token);
          user = SetRole(user);
          console.log(user);
          this.userSubject.next(user);

          return user;
        })
      );
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
    console.log(user);
    this.userSubject.next(user);
    // setTimeout(() => {
    //   alert('Your token will expire in 6 minutes');
    // }, (3600 * 100) / 4);
    return user;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    this.userSubject.next(null);
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
