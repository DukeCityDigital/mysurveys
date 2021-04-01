import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { EmailPattern, PasswordPattern } from "@app/core/helpers/patterns";
import { AuthService } from "@app/core/services/auth.service";
import { AlertService } from "@app/core/components/_alert";
import { GetStepUrl } from "@app/core/helpers/get-step";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm;
  errors = [];
  loading = false;
  returnUrl: string;
  emailPattern = EmailPattern;
  passwordPattern = PasswordPattern;

  constructor(
    private alertService: AlertService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(["/dashboard"]);
    }
  }

  ngOnInit(): void {
    console.log("init");

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        // Validators.pattern(
        //   "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        // ),
      ]),
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.route.paramMap.subscribe((params: any) => {
      if (params.params.hasOwnProperty("email") && params.params.email !== "") {
        // this.loginForm.patchValue({ email: params.params.email });
      }
    });
  }

  quickLogin(email, pass = "") {
    this.loginForm.patchValue({
      email: email,
      password: pass,
    });
    this.onSubmit();
  }

  login(email: string, password: string) {
    return this.authService.login(email, password);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.errors = [];
    return this.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe(
      (data: any) => {
        localStorage.setItem("step", data.step);
        var step = GetStepUrl(data);
        console.log("getstepurl", step);
        const navigationExtras: NavigationExtras = {
          state: { example: data.email },
        };
        if (step == "") {
          step = "dashboard/profile";
        }
        if (data.mustVerifyEmailAddress && data.email) {
          this.returnUrl = "/verify-email";
          this.router.navigate(["/verify-email"], navigationExtras);
          return;
        }
        this.router.navigate([step], navigationExtras);
      },
      (error) => {
        this.alertService.error("Invalid Login", { autoClose: true });
        this.errors.push(error.statusText);
        this.loading = false;
      }
    );
  }
  get f() {
    return this.loginForm.controls;
  }
}
