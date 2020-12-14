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
// import { ErrorHandler } from "../helpers/error.request";

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

  errorHandler(error) {
    let errorMessage = "";
    if (error && error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  private apiServer = environment.apiUrl;

  headers = new HttpHeaders().set("Content-Type", "application/json");

  /**
   *Send custom message
   */
  send_custom_message(post) {
    return this.httpClient
      .post<any>(
        this.apiServer + "/send_custom_message",
        post,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  /**
   * Start selected project
   */
  verify_project_code(post) {
    return this.httpClient
      .post<Project>(
        this.apiServer + "/verify_project_code",
        post,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Start selected project
   */
  start_project(id: number) {
    let post = { project_id: id };
    return this.httpClient
      .post<Project>(this.apiServer + "/start_project", post, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  /**
   * Retrieve projects for user
   */
  my_projects() {
    return this.httpClient
      .get<User>(`${environment.apiUrl}/my_projects`)
      .pipe(catchError(this.errorHandler));
  }

  participants(sort: string, order: string, page: number): Observable<any> {
    return this.httpClient
      .get<User>(`${environment.apiUrl}/users`)
      .pipe(catchError(this.errorHandler));
  }

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

  getAdvancedSelection(post): Observable<any> {
    return this.httpClient
      .post<any>(
        this.apiServer + "/get_advanced_selection",
        post,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getSelection(post): Observable<any> {
    return this.httpClient
      .post<any>(this.apiServer + "/get_selection", post, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  createSelection(post): Observable<any> {
    return this.httpClient
      .post<any>(this.apiServer + "/create_selection", post, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  delete(id) {
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
}
