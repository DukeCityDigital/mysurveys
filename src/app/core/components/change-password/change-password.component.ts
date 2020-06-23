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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {
    this.changePasswordForm = this.createChangePasswordForm();
  }

  createChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      // recaptchaReactive: new FormControl(null, Validators.required),
    });
  }
  get f() {
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {}
}
