import { Component, OnInit } from "@angular/core";
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

  emailLinked = false;
  emailLinkFoundAndHandled = false;
  emailLinkNotFound = false;
  emailVerificationForm: FormGroup;
  submitted = false;

  createSignupForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: [
        null,
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true,
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true,
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          Validators.minLength(8),
        ]),
      ],
      // recaptchaReactive: new FormControl(null, Validators.required),
    });
  }

  constructor(
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
        if (error) {
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
        // console.log("POST Request is successful ", data);
        this.registered = true;
      },
      (error) => {
        if (error.status == 500) {
          this.errors.push("A user exists with that email address");
        } else if (error.status == 500) {
          this.errors.push("That email is in use");
        } else {
          this.errors.push("That email is in use");
        }
      }
    );

    return this.authService.login(email, password);
  }
}

export interface ValidationResult {
  [key: string]: boolean;
}
