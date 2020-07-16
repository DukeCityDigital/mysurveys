export class Alert {
  id: string;
  type: AlertType;
  message: string;
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  fade: boolean;
  motd: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
    // this.keepAfterRouteChange = this.keepAfterRouteChange;
    // this.autoClose = t
    // this.motd = this.motd;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
