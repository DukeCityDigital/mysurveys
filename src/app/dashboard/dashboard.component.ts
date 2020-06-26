import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { GetRole } from "@app/core/helpers/set-role";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.user.subscribe((x) => (this.user = x));
    console.log('fix setting role in dashboard')
    // this.user.role = GetRole(this.user);
  }

  ngOnInit(): void {
    // if (this.currentUser.role === "administrator") {
    //   this.router.navigate(["dashboard/settings"]);
    // } else if (this.currentUser.role === "researcher") {
    //   this.router.navigate(["dashboard/projects"]);
    // }
  }
}
