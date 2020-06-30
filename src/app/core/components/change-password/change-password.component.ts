import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RegistrationService } from "@app/core/services/registration.service";
import { AuthService } from "@app/core/services/auth.service";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  codeConfirmed: boolean = false;
  codeConfirmedAndLoggedIn: boolean = false;

  codeFailed: boolean;
  errors = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {
    this.changePasswordForm = this.createChangePasswordForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.hasOwnProperty("code") && params.params.code !== "") {
        this.authService.logout();
        this.checkChangePasswordCode(params.params.code);
      }
    });
  }

  createChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      // recaptchaReactive: new FormControl(null, Validators.required),
    });
  }
  checkChangePasswordCode(code: string) {
    this.registrationService.checkChangePasswordCode(code).subscribe(
      (data) => {
        console.log("check code data", data);
        if (!data.error) {
          this.codeConfirmed = true;
          this.authService.quickLogin(data);
          return true;
        } else {
          return false;
        }
      },
      (error) => {
        console.log("Error", error);
        if (error) {
          this.errors.push("Record not found");
          this.codeFailed = true;
        } else {
          this.errors.push("There has been an error");
        }
      }
    );
  }

  get f() {
    return this.changePasswordForm.controls;
  }
}
