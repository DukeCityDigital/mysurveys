import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RegistrationService } from "@app/core/services/registration.service";
import { AuthService } from "@app/core/services/auth.service";
import { AlertService } from "../_alert";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  codeConfirmed: boolean = false;
  codeConfirmedAndLoggedIn: boolean = false;
  token: string;
  email: string;
  codeFailed: boolean;
  errors = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.changePasswordForm = this.createChangePasswordForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.hasOwnProperty("code") && params.params.code !== "") {
        this.authService.logout();
        this.checkChangePasswordCode(params.params.code);
        this.token = params.params.code;
      }
    });
  }

  onSubmit() {
    this.errors = [];
    return this.registrationService
      .resetPassword(
        this.email,
        this.changePasswordForm.value.password.password,
        this.token
      )
      .subscribe((r: any) => {
        if (r.access_token) {
          this.authService.quickLogin(r);
          this.alertService.success("Logged in");
          this.router.navigate(["/home"]);
        }
      });
  }

  createChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      password: new FormControl("", [Validators.required]),
    });
  }

  checkChangePasswordCode(code: string) {
    this.registrationService.checkChangePasswordCode(code).subscribe(
      (data) => {
        if (!data.error) {
          this.email = data.email;
          this.codeConfirmed = true;
          this.alertService.success("Logged in");
          this.authService.quickLogin(data);
          return true;
        } else {
          return false;
        }
      },
      (error) => {
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
