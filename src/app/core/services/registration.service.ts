import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { User } from "@app/core/models/user";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set("Content-Type", "application/json");

  requestReset(email: string) {
    let API_URL = `${environment.apiUrl}/auth/reset_password_request`;
    return this.http.post<any>(API_URL, {
      email,
    });
  }

  resetPassword(email: string, password: string, token: string) {
    let API_URL = `${environment.apiUrl}/auth/reset_password`;
    return this.http.post<any>(API_URL, {
      email,
      password,
      token,
    });
  }

  checkChangePasswordCode(code: string) {
    let API_URL = `${environment.apiUrl}/auth/check_change_password_code`;
    return this.http.post<any>(API_URL, {
      code,
    });
  }

  checkVerificationCode(code: string) {
    let API_URL = `${environment.apiUrl}/auth/check_verification_code`;
    return this.http.post<any>(API_URL, {
      code,
    });
  }

  register(email: string, password: string, qualificationForm?: any) {
    let API_URL = `${environment.apiUrl}/auth/register`;
    return this.http.post<any>(API_URL, {
      email,
      password,
      qualificationForm,
    });
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
