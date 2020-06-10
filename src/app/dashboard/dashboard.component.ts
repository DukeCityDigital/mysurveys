import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { GetRole } from "@app/core/helpers/set-role";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  currentUser;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.currentUser.role = GetRole(this.currentUser);
  }

  ngOnInit(): void {}
}
