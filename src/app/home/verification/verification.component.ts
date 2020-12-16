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
  @Input("qualificationForm") qualificationForm: any;

  emailPattern = EmailPattern;
  passwordPattern = PasswordPattern;
  registered = false;
  emailLinkAttempt = false;
  emailLinked = false;
  emailLinkFoundAndHandled = false;
  emailLinkFoundAndHandledResearcher = false;
  emailLinkNotFound = false;
  emailVerificationForm: FormGroup;
  submitted = false;
  userEmail: string;
  user: any;
  errors = [];

  public reactiveForm: FormGroup = new FormGroup({});

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
  resolved(captchaResponse: string) {}
  get f() {
    return this.emailVerificationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errors = [];
    if (!this.qualificationForm) {
      this.alertService.error("You must fill out the qualification form first");
    }
    let f = this.qualificationForm.value;
    f.seed = true;
    this.register(
      this.emailVerificationForm.value.email,
      this.emailVerificationForm.value.password.password,
      f
    );
  }

  checkVerificationCode(code: string) {
    this.registrationService.checkVerificationCode(code).subscribe(
      (data) => {
        if (!data.error) {
          this.user = data;
          if (data.role === "participant") {
            this.emailLinkFoundAndHandled = true;
            this.authService.quickLogin(data);
          } else {
            this.emailLinkFoundAndHandledResearcher = true;
          }
          this.userEmail = data.user && data.user.email ? data.user.email : "";
          return true;
        } else {
          return false;
        }
      },
      (error) => {
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
          //
          this.registered = true;
          this.alertService.success("Successfully registered", {
            autoClose: true,
          });
        },
        (error) => {
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
