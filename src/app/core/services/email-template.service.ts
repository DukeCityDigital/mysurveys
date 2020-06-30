import { Injectable } from "@angular/core";

import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Emailtemplate } from "../models/emailtemplate";

@Injectable({
  providedIn: "root",
})
export class EmailTemplateService {
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private apiServer = environment.apiUrl;

  headers = new HttpHeaders().set("Content-Type", "application/json");

  get(id): Observable<Emailtemplate> {
    return this.httpClient
      .get<Emailtemplate>(this.apiServer + "/email_templates/" + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Emailtemplate[]> {
    return this.httpClient
      .get<Emailtemplate[]>(this.apiServer + "/email_templates")
      .pipe(catchError(this.errorHandler));
  }

  create(Emailtemplate): Observable<Emailtemplate> {
    return this.httpClient
      .post<Emailtemplate>(
        this.apiServer + "/email_templates",
        JSON.stringify(Emailtemplate),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  delete(id) {
    console.log("delete", id);
    return this.httpClient.delete<any>(
      this.apiServer + "/email_templates" + id,
      this.httpOptions
    );
  }
  update(Emailtemplate: Emailtemplate): Observable<any> {
    return this.httpClient.put<any>(
      this.apiServer + "/email_templates/" + Emailtemplate.id,
      Emailtemplate
    );
  }
  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
