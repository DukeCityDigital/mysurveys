import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { EmailPattern, PasswordPattern } from "@app/core/helpers/patterns";
import { AuthService } from "@app/core/services/auth.service";
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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(["/dashboard"]);
    }
  }
  emailPattern = EmailPattern;
  passwordPattern = PasswordPattern;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        // Validators.pattern(
        //   "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        // ),
      ]),
    });
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.hasOwnProperty("email") && params.params.email !== "") {
        this.loginForm.patchValue({ email: params.params.email });
      }
    });

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  }

  test() {
    this.loginForm.patchValue({
      email: "phil@dukecitydigital.com",
      password: "testpass12",
    });
    this.onSubmit();
    // this.register("phil@dukecitydigital.com", "testpass12");
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
        console.log(data);
        if (data.mustVerifyEmailAddress && data.email) {
          const navigationExtras: NavigationExtras = {
            state: { example: data.email },
          };
          console.log("route to verify", navigationExtras);
          this.router.navigate(["/verify-email"], navigationExtras);
          return;
        }
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.errors.push(error);
        this.loading = false;
      }
    );
  }
  get f() {
    return this.loginForm.controls;
  }
}
