import { state } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { AlertService } from "@app/core/components/_alert";
import { User } from "@app/core/models/user";
import { AuthService } from "@app/core/services/auth.service";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit {
  submitted: boolean = false;
  private state: Observable<object>;
  user: User;
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { example: string };
    this.authService.user.subscribe((x) => (this.user = x));

    this.state = this.router.events.pipe(
      filter((e) => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation().extras.state)
    );
    console.log(this.user);
  }

  public resendVerificationEmail() {
    return this.authService
      .resendVerificationCode(this.user.email)
      .subscribe((r: any) => {
        console.log(r);
        this.submitted = true;
        this.alertService.success(r.message);
        // if ()
      });
  }

  ngOnInit(): void {}
}
