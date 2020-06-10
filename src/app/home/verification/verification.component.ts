import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { EmailPattern, PasswordPattern } from "@app/core/helpers/patterns";
import { RegistrationService } from "@app/core/services/registration.service";
import { AuthService } from "@app/core/services/auth.service";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.scss"],
})
export class VerificationComponent implements OnInit {
  emailVerificationForm = this.formBuilder.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
      ),
    ]),
    recaptchaReactive: new FormControl(null, Validators.required),
  });
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {}
  emailPattern = EmailPattern;
  passwordPattern = PasswordPattern;
  registered = false;
  emailLinkAttempt = false;

  emailLinked = false;
  emailLinkFoundAndHandled = false;
  emailLinkNotFound = false;

  public reactiveForm: FormGroup = new FormGroup({});
  errors = [];
  ngOnInit(): void {
    //check if passed param
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.hasOwnProperty("code") && params.params.code !== "") {
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
    console.log("submitted");
    this.register(
      this.emailVerificationForm.value.email,
      this.emailVerificationForm.value.password
    );
  }

  checkVerificationCode(code: string) {
    this.registrationService.checkVerificationCode(code).subscribe(
      (data) => {
        console.log("check code data", data);
        if (!data.error) {
          this.emailLinkFoundAndHandled = true;
          return true;
        } else {
          return false;
        }
      },
      (error) => {
        console.log("Error", error);
        if (error.status == 404) {
          this.errors.push("Record not found");
          this.emailLinkNotFound = true;
        } else {
          this.errors.push("There has been an error");
        }
      }
    );
  }

  register(email: string, password: string) {
    return this.registrationService.register(email, password).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.registered = true;
      },
      (error) => {
        console.log("Error", error);
        if (error.status == 409) {
          this.errors.push("A user exists with that email address");
        } else {
          this.errors.push("There has been an error");
        }
      }
    );

    // return this.authService.login(email, password);
  }
}
