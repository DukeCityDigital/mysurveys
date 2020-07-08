import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { GetRole } from "@app/core/helpers/set-role";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { AlertService } from "@app/core/components/_alert";
import { UserService } from "@app/core/services/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user;

  constructor(
    public alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
    // this.user.role = GetRole(this.user);
  }

  getMotd() {
    this.userService.motd().subscribe((r) => {
      this.alertService.success(r.data, {
        id: "motd",
        keepAfterRouteChange: true,
      });
    });
  }

  ngOnInit(): void {
    // this.alertService.warn("alert service", { id: "alert" });
    var hidemotd = sessionStorage.getItem("hidemotd");

    if (!hidemotd || hidemotd === "false") {
      this.getMotd();
    }

    // if (this.currentUser.role === "administrator") {
    //   this.router.navigate(["dashboard/settings"]);
    // } else if (this.currentUser.role === "researcher") {
    //   this.router.navigate(["dashboard/projects"]);
    // }
  }
}
