import { Injectable } from "@angular/core";

import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Project } from "@app/core/models/project.model";
@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private apiServer = environment.apiUrl;

  headers = new HttpHeaders().set("Content-Type", "application/json");

  getAll(): Observable<Project[]> {
    return this.httpClient
      .get<Project[]>(this.apiServer + "/Projects/")
      .pipe(catchError(this.errorHandler));
  }

  create(Project): Observable<Project> {
    return this.httpClient
      .post<Project>(
        this.apiServer + "/Projects/",
        JSON.stringify(Project),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
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
