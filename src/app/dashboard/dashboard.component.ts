import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { NavigationEnd, Router } from "@angular/router";
import { AlertService } from "@app/core/components/_alert";
import { UserService } from "@app/core/services/user.service";
import { User } from "@app/core/models/user";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user: User;
  emptyDash: boolean = true;
  constructor(
    public alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url !== "/dashboard") {
          this.emptyDash = false;
        }
      }
    });
  }
  public nextStep;
  getMotd() {
    this.userService.motd().subscribe((r) => {
      this.alertService.success(r.data, {
        id: "motd",
        autoClose: false,
        keepAfterRouteChange: true,
      });
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.nextStep = this.user.step;
    }
    // var hidemotd = sessionStorage.getItem("hidemotd");
    // if (!hidemotd || hidemotd === "false") {
    //   this.getMotd();
    // }

    // if (this.user.role === "administrator") {
    //   dont do this
    //   this.router.navigate(["dashboard/settings"]);
    // }
  }
}
