import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RegistrationService } from "@app/core/services/registration.service";
import { AlertService } from "../_alert";
import { AuthService } from "@app/core/services/auth.service";
import { EmailPattern, PasswordPattern } from "@app/core/helpers/patterns";
tap;
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ParticipantService } from "@app/core/services/participant.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  emailPattern = EmailPattern;
  passwordPattern = PasswordPattern;
  changingPassword: boolean = false;
  participant: any;
  changePasswordForm: FormGroup;
  changePasswordFormSubmitted = false;
  changePasswordFormUserEmail: string;
  changeEmailForm: FormGroup;
  changeEmailFormSubmitted = false;
  changeEmailFormUserEmail: string;
  profileForm: FormGroup;
  profileFormSubmitted = false;
  changedPassword = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.changeEmailForm = this.createEmailForm();
    this.changePasswordForm = this.createChangePasswordForm();
    this.profileForm = this.createProfileForm();
  }

  get f() {
    return this.changePasswordForm.controls;
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
    this.getProfile();
  }

  createProfileForm(): FormGroup {
    return this.formBuilder.group({
      first_name: new FormControl(""),
      family_name: new FormControl(""),
      birthyear: new FormControl(""),
      street: new FormControl(""),
      zip: new FormControl(""),
      city: new FormControl(""),
    });
  }

  createEmailForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  createChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      new_password: [""],
    });
  }

  /**
   * Change user's profile
   */
  onSubmitProfileChange() {
    if (!this.profileForm) {
      this.alertService.error(
        "You must fill out the profile change form first"
      );
    }
    this.participantService.update(this.profileForm.value).subscribe((data) => {
      this.getProfile();
    });
  }

  /**
   * Retrieve user's profile
   */
  getProfile() {
    this.participantService
      .profile()
      .pipe(tap((user: any) => this.profileForm.patchValue(user.data)))
      .subscribe((data: any) => {
        this.participant = data.data;
        this.alertService.success(data.message, { autoClose: true });
      });
  }

  updateProfileRequest(form) {
    this.participantService.update(form).subscribe((data) => {
      this.alertService.success(data.message, { autoClose: true });
    });
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
  public demo1TabIndex = 1;
  changePasswordRequest() {
    let post = {
      password: this.changePasswordForm.value.password,
      new_password: this.changePasswordForm.value.new_password.password,
      role: this.participant.role,
    };
    this.registrationService
      .changePasswordRequest(post)
      .pipe()
      .subscribe((data: any) => {
        console.log("changed PW for", data);

        this.changedPassword = true;
        this.alertService.success(data.message, { autoClose: true });
        if (data.data.subrole === "friend") {
          confirm(
            "Thank you for changing your password, you will be navigated to the questionnaire now"
          );
          // this.alertService.success(
          //   "Thank you for changing your password, please make sure to validate your PayPal"
          // );
          // this.demo1TabIndex = 0;
          this.router.navigate(["questionnaire"], {
            queryParams: { consent: "irb", role: "peer" },
          });
        }
      });
  }

  changeEmailRequest(email) {
    this.registrationService.changeEmailRequest(email).subscribe((data) => {
      this.alertService.success(data.message, { autoClose: true });
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
          return true;
        } else {
          return false;
        }
      },
      (error) => {
        this.alertService.error(error.message);
      }
    );
  }
}
