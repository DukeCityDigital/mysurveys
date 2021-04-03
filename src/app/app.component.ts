import { Component, HostListener, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService as AuthenticationService } from "@app/core/services/auth.service";

import { AlertService } from "./core/components/_alert";
import { MatSidenav } from "@angular/material/sidenav";
import { LoaderService } from "./core/services/loader.service";
import { concatMap, delay } from "rxjs/operators";
import { Subscription, of } from "rxjs";
import { VERSION } from "../environments/version";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public version = VERSION;
  public user;
  public screenWidth: any;
  public screenHeight: any;
  public show: boolean = false;
  private subscription: Subscription;

  navLinks = [];
  opened: boolean = false;
  sideNavMode = "side";
  mobileView = false;
  logo = "../assets/sfilogo.jpg";
  title = "MySurveys";

  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService
  ) {
    // this.user = this.authenticationService.userValue;
    this.onResize();
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    if (!this.user) {
      this.authenticationService.logout();
    }
    this.subscription = this.loaderService.loaderState
      .pipe(concatMap((item) => of(item).pipe(delay(50))))
      .subscribe((state: any) => {
        this.show = state.show;
      });
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 680) {
      this.opened = true;
    }
    console.log(this.user);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.navLinks = this.getLinks();
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Handle menu for device width
   * @param event
   */
  @HostListener("window:resize", ["$event"])
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

  getLinks() {
    if (this.user && this.user.role) {
      if (this.user.is_seed == 1) {
        return this.links.seed.concat(this.links.end);
      }
      if (this.user.role == "administrator") {
        return this.links.base
          .concat(this.links[this.user.role])
          .concat(this.links.end);
      }
      if (this.user.subrole == "friend") {
        return this.links.end.concat(this.links.friend);
      }
      return this.links.base
        .concat(this.links[this.user.role])
        .concat(this.links.end);
    }
    return this.links.base.concat(this.links.end);
  }

  getPreloginMessage() {
    this.alertService.success("prelogin", {
      id: "prelogin",
      autoClose: false,
      keepAfterRouteChange: true,
    });
  }

  /**
   * Build links for different roles
   */
  links = {
    base: [
      //retain
      // { name: "home", link: "/dashboard", icon: "home" }
    ],
    end: [{ name: "profile", link: "/dashboard/profile", icon: "person" }],

    friend: [
      { name: "PayPal", link: "/dashboard/paypal", icon: "monetization_on" },
      {
        name: "questionnaire",
        link: "dashboard/questionnaire",
        icon: "question_answer",
      },

      {
        name: "my surveys",
        link: "/dashboard/my-projects",
        icon: "assignment",
      },
    ],

    participant: [
      { name: "PayPal", link: "/dashboard/paypal", icon: "monetization_on" },
      // {
      //   name: "questionnaire",
      //   link: "/questionnaire",
      //   icon: "question_answer",
      // },
      { name: "friends", link: "/dashboard/friends", icon: "people_outline" },

      {
        name: "my surveys",
        link: "/dashboard/my-projects",
        icon: "assignment",
      },
    ],

    seed: [
      // {
      //   name: "questionnaire",
      //   link: "/questionnaire",
      //   icon: "question_answer",
      // },
      { name: "PayPal", link: "/dashboard/paypal", icon: "monetization_on" },
      { name: "friends", link: "/dashboard/friends", icon: "people_outline" },

      {
        name: "my surveys",
        link: "/dashboard/my-projects",
        icon: "assignment",
      },
    ],
    researcher: [
      { name: "projects", link: "/dashboard/projects", icon: "assignment" },
    ],

    administrator: [
      { name: "settings", link: "/dashboard/settings", icon: "settings" },

      { name: "users", link: "/dashboard/users", icon: "people_outline" },
      {
        name: "system log",
        link: "/dashboard/log",
        icon: "format_list_bulleted",
      },
      // { name: "MOTD", link: "/dashboard/motd", icon: "chat" },
    ],
  };

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
