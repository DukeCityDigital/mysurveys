import { Injectable } from "@angular/core";

import { throwError, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { Project } from "@app/core/models/project.model";
import { Settings } from "../models/settings.model";
@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private apiServer = environment.apiUrl;

  headers = new HttpHeaders().set("Content-Type", "application/json");
  //retrieve project settings
  getSettings(): Observable<any> {
    return this.httpClient
      .get<any>(this.apiServer + "/settings")
      .pipe(catchError(this.errorHandler));
  }
  updateSettings(settings: Settings): Observable<any> {
    return this.httpClient.put<any>(
      this.apiServer + "/settings/" + settings.id,
      settings
    );
  }

  findOmni(
    model = "",
    active = "",
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<any[]> {
    return this.httpClient
      .get(this.apiServer + "/omni", {
        params: new HttpParams()
          .set("model", model.toString())

          .set("active", active.toString())
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("page", pageNumber.toString())
          .set("pageSize", pageSize.toString()),
      })
      .pipe(map((res) => res["data"]));
  }
  findLogs(
    active = "",
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<any[]> {
    return this.httpClient
      .get(this.apiServer + "/logs", {
        params: new HttpParams()
          .set("active", active.toString())
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("page", pageNumber.toString())
          .set("pageSize", pageSize.toString()),
      })
      .pipe(map((res) => res["data"]));
  }
  getLog(
    sort: string,
    order: string,
    page: number,
    project_id: number
  ): Observable<any> {
    const href = environment.apiUrl;
    const requestUrl = `${href}/log?project_id=${project_id}&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this.httpClient.get<any>(requestUrl);
  }

  backup(): Observable<any> {
    return this.httpClient
      .post<any>(this.apiServer + "/backup", this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  log(post): Observable<any> {
    return this.httpClient
      .post<any>(this.apiServer + "/log", post, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  inviteResearcher(data): Observable<any> {
    return this.httpClient
      .post<any>(this.apiServer + "/invite_researcher", data)
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

    return throwError(errorMessage);
  }
}
