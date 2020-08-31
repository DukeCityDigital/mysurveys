import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService as AuthenticationService } from "@app/core/services/auth.service";
import { AlertService } from "./core/components/_alert";
import { WarningsComponent } from "./core/components/warnings/warnings.component";
import { UserService } from "./core/services/user.service";
import { DataComponent } from "./core/components/data/data.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public user;
  navLinks = [];
  opened: boolean = false;

  public screenWidth: any;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // this.user = this.authenticationService.userValue;

    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  getLinks() {
    if (this.user.role) {
      return this.links.base
        .concat(this.links[this.user.role])
        .concat(this.links.end);
    }
    return this.links.base.concat(this.links.end);
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 680) {
      this.opened = true;
    }
  }

  getPreloginMessage() {
    this.alertService.success("prelogin", {
      id: "prelogin",
      autoClose: false,
      keepAfterRouteChange: true,
    });
    // this.userService.motd().subscribe((r) => {
    //   this.alertService.success(r.data, {
    //     id: "motd",
    //     autoClose: false,
    //     keepAfterRouteChange: true,
    //   });
    // });
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
      { name: "projects", link: "/dashboard/projects", icon: "assignment" },
      // { name: "notifications", link: "dashboard/notifications", icon: "chat" },

      // {
      //   name: "import/export",
      //   link: "/dashboard/data",
      //   icon: "import_export",
      // },

      // { name: "selection", link: "selection", icon: "" },
    ],

    administrator: [
      {
        name: "settings",
        link: "/dashboard/settings",
        icon: "settings",
      },
      { name: "users", link: "/dashboard/users", icon: "people_outline" },
      { name: "participants", link: "/dashboard/participants", icon: "people" },

      {
        name: "payouts",
        link: "/dashboard/payouts",
        icon: "attach_money",
      },
      { name: "warnings", link: "/dashboard/warnings", icon: "warning" },
      {
        name: "system log",
        link: "/dashboard/log",
        icon: "format_list_bulleted",
      },
      { name: "MOTD", link: "/dashboard/motd", icon: "chat" },
    ],
  };

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
