import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/services/auth.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit {
  example: string;
  submitted: false;
  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { example: string };
    console.log(state, this.example);
    if (state) {
      this.example = state.example;
    }
  }

  public resendVerificationEmail() {
    return this.authService
      .resendVerificationCode(this.example)
      .subscribe((r) => {
        console.log(r);
      });
  }

  ngOnInit(): void {}
}
