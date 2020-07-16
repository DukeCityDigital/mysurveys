import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RegistrationService } from "@app/core/services/registration.service";
import { AlertService } from "../_alert";
import { AuthService } from "@app/core/services/auth.service";
import { EmailPattern, PasswordPattern } from "@app/core/helpers/patterns";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  emailPattern = EmailPattern;
  passwordPattern = PasswordPattern;
  changingPassword: boolean = false;
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,

    private registrationService: RegistrationService,
    private route: ActivatedRoute
  ) {
    this.changeEmailForm = this.createEmailForm();
    this.changePasswordForm = this.createChangePasswordForm();
  }

  changePasswordForm: FormGroup;
  changePasswordFormSubmitted = false;
  changePasswordFormUserEmail: string;

  changeEmailForm: FormGroup;
  changeEmailFormSubmitted = false;
  changeEmailFormUserEmail: string;

  createEmailForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  createChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      password: ["", Validators.required],
      new_password: [""],
    });
  }
  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmitEmailChange() {
    if (!this.changeEmailForm) {
      this.alertService.error("You must fill out the email change form first");
    }
    this.changeEmailRequest(this.changeEmailForm.value.email);
  }

  onSubmitPasswordChange() {
    if (!this.changeEmailForm) {
      this.alertService.error(
        "You must fill out the password change form first"
      );
      return false;
    }
    this.changePasswordRequest();
  }

  changePasswordRequest() {
    let post = {
      password: this.changePasswordForm.value.password,
      new_password: this.changePasswordForm.value.new_password.password,
    };
    this.registrationService.changePasswordRequest(post).subscribe((data) => {
      this.alertService.success(data.message, { autoClose: true });
    });
  }

  changeEmailRequest(email) {
    this.registrationService.changeEmailRequest(email).subscribe((data) => {
      this.alertService.success(data.message, { autoClose: true });
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      if (
        params.params.hasOwnProperty("change_email") &&
        params.params.change_email !== ""
      ) {
        //send code to DB and verify, if change successful return and quicklogin with new email
        this.checkChangeEmailCode(params.params.change_email);
      }
    });
  }

  checkChangeEmailCode(token: string) {
    this.registrationService.checkChangeEmailCode(token).subscribe(
      (data) => {
        if (!data.error) {
          this.changingPassword = true;
          this.alertService.success("Your email address has been changed", {
            autoClose: true,
          });

          this.authService.quickLogin(data);
          // this.userEmail = data.user.email;
          return true;
        } else {
          return false;
        }
      },
      (error) => {
        console.log("Error", error);
        this.alertService.error(error.message);
      }
    );
  }
}
