import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { Router } from "@angular/router";
import { AlertService } from "@app/core/components/_alert";
import { UserService } from "@app/core/services/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user;

  friends_verified_paypal: number;
  friends_verified_email: number;

  constructor(
    public alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

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
    console.log(this.user);

    var hidemotd = sessionStorage.getItem("hidemotd");
    if (!hidemotd || hidemotd === "false") {
      // this.getMotd();
    }

    if (this.user.role === "administrator") {
      // dont do this
      // this.router.navigate(["dashboard/settings"]);
    }
    if (this.user.friends && this.user.friends.length) {
      this.user.friends.forEach((element) => {
        if (element.paypal_id_status == "Ok") {
          this.friends_verified_paypal += 1;
        }
        if (element.user.email_verified_at) {
          this.friends_verified_email += 1;
        }
      });
    }
  }
}
