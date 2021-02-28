import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
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
  //does the participant already have 2 validated friends?
  friendsLimitReached: boolean = false;
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
    // return false;
    this.registrationService.checkVerificationCode(code).subscribe(
      (data) => {
        if (data.status == false) {
          this.friendsLimitReached = true;
          this.alertService.error(
            "Thank you for your interest, but for now we have enough participants."
          );
          return false;
        }

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
          this.notifyParent.emit(null);
        },
        (error) => {
          console.log("regerror", error);
          if (error.status == 409) {
            var exists = "A user exists with that email address";
            this.errors.push(exists);
            this.alertService.error(exists);
            return false;
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
