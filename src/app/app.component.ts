import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService as AuthenticationService } from "@app/core/services/auth.service";
import { AlertService } from "./core/components/_alert";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public user;
  navLinks = [];
  opened: boolean = true;

  getLinks() {
    return this.links.base
      .concat(this.links[this.user.role])
      .concat(this.links.end);
  }

  links = {
    base: [{ name: "home", link: "/dashboard", icon: "home" }],
    end: [
      // { name: "other links?", link: "/", icon: "" },
      { name: "profile", link: "/dashboard/profile", icon: "person" },
    ],

    participant: [
      // { name: "statistics", link: "/", icon: "poll" },
      { name: "friends", link: "/dashboard/friends", icon: "people_outline" },
      {
        name: "my projects",
        link: "/dashboard/my-projects",
        icon: "people_outline",
      },

      { name: "payPal", link: "/dashboard/paypal", icon: "monetization_on" },
    ],
    researcher: [
      { name: "projects", link: "my-projects", icon: "assignment" },

      // { name: "selection", link: "selection", icon: "" },
    ],

    administrator: [
      {
        name: "settings",
        link: "/dashboard/settings",
        icon: "settings",
      },
      { name: "users", link: "/dashboard/users", icon: "people_outline" },
      { name: "payouts", link: "/", icon: "attach_money", disabled: true },
      { name: "warnings", link: "/", icon: "warning", disabled: true },
      {
        name: "system log",
        link: "/dashboard/log",
        icon: "format_list_bulleted",
      },
      { name: "backup", link: "/", icon: "backup", disabled: true },
      { name: "MOTD", link: "/", icon: "chat", disabled: true },
    ],
  };

  constructor(
    // private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // this.user = this.authenticationService.userValue;

    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
