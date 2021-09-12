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

  /**
   * Send email invites to selected participants
   * @param email
   * @param invite
   */
  sendProjectInvitations(post): Observable<Participant> {
    return this.httpClient
      .post<Participant>(
        this.apiServer + "/send_project_invitations",
        post,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  inviteFriend(post): Observable<Participant> {
    return this.httpClient.post<Participant>(
      this.apiServer + "/invite_friend",
      post,
      this.httpOptions
    );
  }

  remindFriend(post): Observable<Participant> {
    return this.httpClient.post<Participant>(
      this.apiServer + "/remind_friend",
      post,
      this.httpOptions
    );
  }

  validatePaypal(email, paypalme): Observable<any> {
    return this.httpClient.post<any>(
      this.apiServer + "/validate_paypal",
      { email: email, paypalme: paypalme },
      this.httpOptions
    );
  }
  profile(): Observable<Participant> {
    return this.httpClient
      .get<Participant>(this.apiServer + "/profile")
      .pipe(catchError(this.errorHandler));
  }
  getUser(id?): Observable<User> {
    let actual = id ? id : this.authService.userValue.id;
    return this.httpClient
      .get<User>(this.apiServer + "/users/" + actual)
      .pipe(catchError(this.errorHandler));
  }
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<any>(this.apiServer + "/users/" + user.id, user);
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
    return this.httpClient.delete<any>(
      this.apiServer + "/participants/" + id,
      this.httpOptions
    );
  }

  updateList(post: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiServer + "/update_participant_validation",
      post
    );
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
}
