import { Injectable } from "@angular/core";

import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Participant } from "@app/core/models/participant.model";
import { User } from "@app/core/models/user";

@Injectable({
  providedIn: "root",
})
export class ParticipantService {
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private apiServer = environment.apiUrl;

  headers = new HttpHeaders().set("Content-Type", "application/json");

  get(id): Observable<Participant> {
    return this.httpClient
      .get<Participant>(this.apiServer + "/participants/" + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Participant[]> {
    return this.httpClient
      .get<Participant[]>(this.apiServer + "/participants")
      .pipe(catchError(this.errorHandler));
  }

  create(Participant): Observable<Participant> {
    return this.httpClient
      .post<Participant>(
        this.apiServer + "/participants",
        JSON.stringify(Participant),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  delete(id) {
    console.log("pdelete", id);
    return this.httpClient.delete<any>(
      this.apiServer + "/participants/" + id,
      this.httpOptions
    );

    // return this.httpClient
    //   .delete<Participant>(this.apiServer + "/Participants/" + id, this.httpOptions)
    //   .pipe(catchError(this.errorHandler));
  }
  update(Participant: Participant): Observable<any> {
    return this.httpClient.put<any>(
      this.apiServer + "/participants/" + Participant.id,
      Participant
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
