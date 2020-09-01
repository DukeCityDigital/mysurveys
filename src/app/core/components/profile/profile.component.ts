import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,

    private registrationService: RegistrationService,
    private route: ActivatedRoute
  ) {
    this.changeEmailForm = this.createEmailForm();
    this.changePasswordForm = this.createChangePasswordForm();
    this.profileForm = this.createProfileForm();
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
  get f() {
    return this.changePasswordForm.controls;
  }
  onSubmitProfileChange() {
    console.log("profilechange", this.profileForm.value);
    if (!this.profileForm) {
      this.alertService.error(
        "You must fill out the profile change form first"
      );
    }
    this.participantService.update(this.profileForm.value).subscribe((data) => {
      console.log(data);
      this.getProfile();
    });
  }

  /**
   * Retrieve user's profile
   */
  getProfile() {
    this.participantService
      .get()
      .pipe(tap((user: any) => this.profileForm.patchValue(user.data)))
      .subscribe((data: any) => {
        console.log(data);
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

  changePasswordRequest() {
    let post = {
      password: this.changePasswordForm.value.password,
      new_password: this.changePasswordForm.value.new_password.password,
    };
    console.log("changepass", post);
    this.registrationService
      .changePasswordRequest(post)
      .pipe()
      .subscribe((data: any) => {
        console.log(data);
        // this.participant = data.data;
        console.log(data);
        this.alertService.success(data.message, { autoClose: true });
      });

    // .subscribe((data) => {
    //   console.log(data);
    //   this.alertService.success(data.message, { autoClose: true });
    // });
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
