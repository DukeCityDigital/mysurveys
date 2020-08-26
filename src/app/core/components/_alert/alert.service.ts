import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";

import { Alert, AlertType } from "./alert.model";

@Injectable({ providedIn: "root" })
export class AlertService {
  constructor() {
    // console.log("alert trigger");
  }
  private subject = new Subject<Alert>();
  private defaultId = "da";

  // enable subscribing to alerts observable
  public onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  // convenience methods
  public success(message: string, options?: any) {
    // console.log("alertsuccess", message, options);
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  public error(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method
  public alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
