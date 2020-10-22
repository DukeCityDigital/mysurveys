import { Component, HostListener, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
ViewChild
import { AuthService as AuthenticationService } from "@app/core/services/auth.service";
import { AlertService } from "./core/components/_alert";
import { WarningsComponent } from "./core/components/warnings/warnings.component";
import { UserService } from "./core/services/user.service";
import { DataComponent } from "./core/components/data/data.component";
import { MatSidenav } from '@angular/material/sidenav';
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
  public screenHeight: any;
  sideNavMode = 'side';
  mobileView = false;
  logo = "../assets/sfilogo.jpg"

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 591) {
      this.mobileView = true;
      // this.sideNavMode = 'over';
    } else {
      this.mobileView = false;

      // this.sideNavMode = 'side';
    }
    // this.screenWidth < 591 ? this.sideNavMode = 'over' : 'side';
  }

  public customToggle() {

    this.mobileView ? this.sidenav.close() : null;
  }

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // this.user = this.authenticationService.userValue;
    this.onResize();
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
    base:
      [
        // { name: "home", link: "/dashboard", icon: "home" }
      ],
    end: [
      // { name: "other links?", link: "/", icon: "" },
      { name: "profile", link: "/dashboard/profile", icon: "person" },
    ],

    participant: [
      // { name: "statistics", link: "/", icon: "poll" },
      {
        name: "1. friends",
        link: "/dashboard/friends",
        icon: "people_outline",
      },

      { name: "2. payPal", link: "/dashboard/paypal", icon: "monetization_on" },
      {
        name: "3. my projects",
        link: "/dashboard/my-projects",
        icon: "assignment",
      },
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

      // {
      //   name: "payouts",
      //   link: "/dashboard/payouts",
      //   icon: "attach_money",
      // },
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
