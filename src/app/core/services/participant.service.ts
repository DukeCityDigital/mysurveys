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
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ParticipantService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private apiServer = environment.apiUrl;

  headers = new HttpHeaders().set("Content-Type", "application/json");

  inviteFriend(email): Observable<Participant> {
    return this.httpClient.post<Participant>(
      this.apiServer + "/invite_friend",
      { email: email },
      this.httpOptions
    );
  }

  get(id?): Observable<Participant> {
    let actual = id ? id : this.authService.userValue.id;
    return this.httpClient
      .get<Participant>(this.apiServer + "/participants/" + actual)
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
    let actual = Participant.id
      ? Participant.id
      : this.authService.userValue.id;

    return this.httpClient.put<any>(
      this.apiServer + "/participants/" + actual,
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
