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
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // TODO remove
  test() {
    return this.http.get<User>(`${environment.apiUrl}/test`).subscribe((r) => {
      console.log(r);
    });
  }
  users() {
    return this.http.get<User>(`${environment.apiUrl}/users`);
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
          localStorage.setItem("currentUser", JSON.stringify(user));
          let u = JSON.stringify(user);
          localStorage.setItem("access_token", JSON.parse(u).access_token);
          user = SetRole(user);
          console.log(user);
          this.currentUserSubject.next(user);
          setTimeout(() => {
            confirm("Your token will expire in 6 minutes");
            // alert('Your token will expire in 6 minutes');
          }, (3600 * 100) / 4);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("access_token");

    this.currentUserSubject.next(null);
  }
}
