import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService as AuthenticationService } from "@app/core/services/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  currentUser;
  navLinks = [];

  links = {
    base: [{ name: "other links?", link: "/", icon: "" }],
    participant: [
      { name: "home", link: "/dashboard", icon: "" },
      { name: "statistics", link: "/", icon: "" },
      { name: "account information", link: "/", icon: "" },
    ],
    researcher: [
      { name: "home", link: "/", icon: "" },
      { name: "projects", link: "dashboard/projects", icon: "" },

      { name: "selection", link: "selection", icon: "" },

      { name: "project management", link: "/", icon: "" },
      { name: "account information", link: "/", icon: "" },
    ],

    administrator: [
      { name: "home", link: "/dashboard/settings", icon: "" },
      {
        name: "settings",
        link: "/dashboard/settings",
        icon: "",
      },
      { name: "show users", link: "selection", icon: "" },
      { name: "manage payouts", link: "/", icon: "" },
      { name: "manage participants", link: "/", icon: "" },
      { name: "manage warnings", link: "/", icon: "" },
      { name: "system log", link: "/", icon: "" },
      { name: "backup", link: "/", icon: "" },
      { name: "MOTD", link: "/", icon: "" },
    ],
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.navLinks = [];
    if (this.currentUser && this.links[this.currentUser.role])
      this.navLinks.push(this.links[this.currentUser.role]);
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
