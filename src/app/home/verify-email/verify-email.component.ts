import { state } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { AuthService } from "@app/core/services/auth.service";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit {
  example: string;
  submitted: false;
  private state: Observable<object>;

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { example: string };

    if (state) {
      this.example = state.example;
    }
    this.state = this.router.events.pipe(
      filter((e) => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation().extras.state)
    );
  }

  public resendVerificationEmail() {
    return this.authService
      .resendVerificationCode(this.example)
      .subscribe((r) => {});
  }

  ngOnInit(): void {}
}
