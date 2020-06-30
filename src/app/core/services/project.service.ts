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
import { User } from "@app/core/models/user";

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

  users() {
    return this.httpClient
      .get<User>(`${environment.apiUrl}/users`)
      .pipe(catchError(this.errorHandler));
  }

  get(id): Observable<Project> {
    return this.httpClient
      .get<Project>(this.apiServer + "/projects/" + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Project[]> {
    return this.httpClient
      .get<Project[]>(this.apiServer + "/projects")
      .pipe(catchError(this.errorHandler));
  }

  create(Project): Observable<Project> {
    return this.httpClient
      .post<Project>(
        this.apiServer + "/projects",
        JSON.stringify(Project),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  delete(id) {
    console.log("pdelete", id);
    return this.httpClient.delete<any>(
      this.apiServer + "/projects/" + id,
      this.httpOptions
    );

    // return this.httpClient
    //   .delete<Project>(this.apiServer + "/projects/" + id, this.httpOptions)
    //   .pipe(catchError(this.errorHandler));
  }
  update(project: Project): Observable<any> {
    return this.httpClient.put<any>(
      this.apiServer + "/projects/" + project.id,
      project
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
