import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CustomValidators } from "@app/core/helpers/custom-validators";
import { EmailPattern, PasswordPattern } from "@app/core/helpers/patterns";
import { AuthService } from "@app/core/services/auth.service";
import { RegistrationService } from "@app/core/services/registration.service";
import { AlertService } from "@app/core/components/_alert";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.scss"],
})
export class VerificationComponent implements OnInit {
  emailPattern = EmailPattern;
  passwordPattern = PasswordPattern;
  registered = false;
  emailLinkAttempt = false;
  @Input("qualificationForm") qualificationForm: any;

  emailLinked = false;
  emailLinkFoundAndHandled = false;
  emailLinkFoundAndHandledResearcher = false;

  emailLinkNotFound = false;
  emailVerificationForm: FormGroup;
  submitted = false;
  userEmail: string;

  createSignupForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: [],
      // recaptchaReactive: new FormControl(null, Validators.required),
    });
  }

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {
    this.emailVerificationForm = this.createSignupForm();
  }

  public reactiveForm: FormGroup = new FormGroup({});
  errors = [];
  ngOnInit(): void {
    //check if passed param
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.hasOwnProperty("code") && params.params.code !== "") {
        this.authService.logout();
        this.emailLinkAttempt = true;
        this.checkVerificationCode(params.params.code);
      }
    });
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  get f() {
    return this.emailVerificationForm.controls;
  }

  test() {
    this.register(
      "phil22" +
        Math.random().toString().split(".")[1].slice(1, 5) +
        "@dukecitydigital.com",
      "Testpass12!"
    );
  }

  onSubmit() {
    this.errors = [];
    console.log("submitted", this.emailVerificationForm.value);
    this.register(
      this.emailVerificationForm.value.email,
      this.emailVerificationForm.value.password.password,
      this.qualificationForm.value
    );
  }

  checkVerificationCode(code: string) {
    this.registrationService.checkVerificationCode(code).subscribe(
      (data) => {
        console.log("check code data", data);
        if (!data.error) {
          if (data.role === "participant") {
            this.emailLinkFoundAndHandled = true;

            this.authService.quickLogin(data);
          } else {
            this.emailLinkFoundAndHandledResearcher = true;
          }
          this.userEmail = data.user.email;
          return true;
        } else {
          return false;
        }
      },
      (error) => {
        console.log("Error", error);
        if (error) {
          this.errors.push("Record not found");
          this.emailLinkNotFound = true;
        } else {
          this.errors.push("There has been an error");
        }
        this.alertService.error(error.error.message);
      }
    );
  }

  register(email: string, password: string, qualificationForm?: any) {
    return this.registrationService
      .register(email, password, qualificationForm)
      .subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          this.registered = true;
          this.alertService.success("Successfully registered", {
            autoClose: true,
          });
        },
        (error) => {
          console.log(error);
          if (error.status == 500) {
            this.errors.push("A user exists with that email address");
          } else if (error.status == 500) {
            this.errors.push(error);
          } else {
            this.errors.push("That email is in use");
          }
          this.alertService.error(error, { autoClose: true });
        }
      );

    return this.authService.login(email, password);
  }
}

export interface ValidationResult {
  [key: string]: boolean;
}