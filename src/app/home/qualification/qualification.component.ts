import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from "@angular/animations";
import { setTimeout } from "timers";

import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ParticipantService } from "@app/core/services/participant.service";
import { User } from "@app/core/models/user";
import { AuthService } from "@app/core/services/auth.service";
import { AlertService } from "@app/core/components/_alert";
import { RegistrationService } from "@app/core/services/registration.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-qualification",
  templateUrl: "./qualification.component.html",
  styleUrls: ["./qualification.component.scss"],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          height: "auto",
          opacity: 1,
          // backgroundColor: "yellow",
        })
      ),
      state(
        "closed",
        style({
          height: "0",
          opacity: 0,
          // backgroundColor: "green",
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("0.5s")]),
    ]),
  ],
})
export class QualificationComponent implements OnInit {
  accepted_short_consent: boolean = false;
  qualified: boolean;
  submitted: boolean = false;
  qualificationForm;
  isOpen = true;
  user: User;
  htmlString = "";
  consentForm: string;
  passed_query_param_role: string;

  ngOnInit(): void {
    this.remakeForm();
    this.getMe();
  }

  constructor(
    private participantService: ParticipantService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private alertService: AlertService,
    private registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.consentForm = params["consent"];
      this.passed_query_param_role = params["role"];
      console.log(this.consentForm);
    });
  }

  /**
   * Check if user is registered and get profile if so
   */
  getMe() {
    if (this.authService.userValue) {
      this.participantService.get().subscribe((data: any) => {
        this.user = data.data;
        this.remakeForm();

        if (this.user.survey_complete) {
          this.submitted = true;
        }
      });
    }
  }
  possibleResponses = [
    { name: "Completely unsafe", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "Completely safe", value: 7 },
  ];

  toggle() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Show if a user is qualified
   *
   */
  isQualified(f) {
    f = f.value;
    if (!this.qualificationForm) {
      return false;
    }
    let qualified;
    this.isOpen = true;
    let gmOk = parseInt(f.gm) !== 1 && parseInt(f.gm) !== 7;
    let vacOk = parseInt(f.vac) !== 1 && parseInt(f.vac) !== 7;

    if (
      (f.us === "true" &&
        f.parents === "true" &&
        f.friends === "true" &&
        (vacOk || gmOk)) ||
      (this.user &&
        this.user.subrole == "friend" &&
        f.us === "true" &&
        f.parents === "true")
    ) {
      qualified = true;
    } else {
      qualified = false;
    }

    this.qualified = qualified;
    return this.qualified;
  }

  remakeForm() {
    this.qualificationForm = new FormGroup({
      parents: new FormControl("", [Validators.required]),
      gm: new FormControl("", [Validators.required]),
      vac: new FormControl("", [Validators.required]),
      us: new FormControl("", [Validators.required]),
      friends: new FormControl("", [Validators.required]),
    });
    if (
      this.passed_query_param_role == "peer" ||
      (this.user && this.user.subrole == "friend")
    ) {
      this.qualificationForm.get("friends").clearValidators();
    }
    console.log("qualform", this.qualificationForm);
  }

  onSubmit() {
    // if no user do regular routine, otherwise send form directly
    console.log("qualform", this.qualificationForm, this.authService.userValue);
    if (!this.qualificationForm) {
      this.alertService.error("You must fill out the qualification form first");
      return false;
    }
    debugger;
    let f = this.qualificationForm.value;

    if (this.user.subrole == "friend") {
    } else {
      f.seed = true;
    }
    this.submit_qualification_form(f);

    if (this.isQualified(this.qualificationForm)) {
      this.submitted = true;
    } else {
      this.qualified = false;
      this.submitted = true;
      // this.alertService.error(
      //   "Sorry, you're not currently qualified for the study"
      // );
    }

    // this.isQualified = this.qualificationForm;
  }
  submit_qualification_form(qualificationForm?: any) {
    return this.registrationService
      .user_submit_qualification_form(qualificationForm)
      .subscribe(
        (data) => {
          console.log("qualform");
          console.log(data);
          if (this.user.subrole == "friend") {
            if (this.isQualified(this.qualificationForm)) {
              let c = confirm(
                "Thank you for your form submission.  You will now be navigated to PayPal validation page"
              );
              if (c) {
                this.router.navigate(["/dashboard/paypal"]);
                return false;
              }
            } else {
              this.qualified = false;
              let c = confirm(
                "We're sorry, you're not a fit for any of our current studies"
              );
              if (c) {
                this.router.navigate(["/dashboard/questionnaire"]);
                return false;
              }
            }
          }
          //
          this.alertService.success("Successfully submitted", {
            autoClose: true,
          });
          this.getMe();
        },
        (error) => {
          this.alertService.error(error, { autoClose: true });
        }
      );
  }
}
