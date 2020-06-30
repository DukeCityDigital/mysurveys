import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  motd() {
    let API_URL = `${environment.apiUrl}/motd`;
    return this.http.get<any>(API_URL);
  }
}
