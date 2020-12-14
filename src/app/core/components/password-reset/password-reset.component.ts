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
  selector: "app-password-reset",
  templateUrl: "./password-reset.component.html",
  styleUrls: ["./password-reset.component.scss"],
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {
    this.resetForm = this.createResetForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.hasOwnProperty("code") && params.params.code !== "") {
        this.authService.logout();
      }
    });
  }

  createResetForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      // recaptchaReactive: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    this.submitted = true;
    return this.registrationService
      .requestReset(this.resetForm.value.email)
      .subscribe((data) => {
        this.message = data.message;
      });
  }
  get f() {
    return this.resetForm.controls;
  }
}
