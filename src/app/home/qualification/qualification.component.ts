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
  qualified: boolean = false;
  submitted: boolean = false;
  qualificationForm;
  isOpen = true;
  user: User;
  htmlString = "";
  consentForm: string;
  passed_query_param_role: string;
  _USER_IS_PEER: boolean = false;

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
    });
  }

  ngOnInit(): void {
    this.qualificationForm = new FormGroup({
      parents: new FormControl("", [Validators.required]),
      gm: new FormControl("", [Validators.required]),
      vac: new FormControl("", [Validators.required]),
      us: new FormControl("", [Validators.required]),
      friends: new FormControl("", [Validators.required]),
      share_data: new FormControl("", [Validators.required]),
    });
    this.getMe();
  }

  /**
   * Check if user is registered and get profile if so
   */
  getMe() {
    if (this.authService.userValue) {
      this.participantService.profile().subscribe((data: any) => {
        console.log("getmedata", data);
        this._USER_IS_PEER = data.data.seed_id !== null;
        this.user = data.data;
        this.remakeForm();
        if (this.user.survey_complete) {
          this.submitted = true;
        }
      });
    } else {
      this._USER_IS_PEER = false;
      this.qualificationForm.removeControl("share_answers");
    }
  }

  remakeForm() {
    if (this._USER_IS_PEER) {
      this.qualificationForm.removeControl("friends");
    } else {
      this.qualificationForm.removeControl("share_answers");
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
    // let gmOk = parseInt(f.gm) !== 1 && parseInt(f.gm) !== 7;
    // let vacOk = parseInt(f.vac) !== 1 && parseInt(f.vac) !== 7;
    let gmOk = true;
    let vacOk = true;

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

  onSubmit() {
    // if no user do regular routine, otherwise send form directly
    if (!this.qualificationForm) {
      this.alertService.error("You must fill out the qualification form first");
      return false;
    }
    let f = this.qualificationForm.value;

    if (!this._USER_IS_PEER) {
      f.seed = true;
    } else if (
      this._USER_IS_PEER &&
      !this.isQualified(this.qualificationForm)
    ) {
      alert("Sorry, you're not qualified for any current studies");
      this.router.navigate(["my-projects"]);
      return false;
    } else if (this._USER_IS_PEER && this.isQualified(this.qualificationForm)) {
      f.friends = null;
      this.submit_qualification_form(f);
    }

    if (this.isQualified(this.qualificationForm)) {
      this.submitted = true;
      this.qualified = true;
    } else {
      this.qualified = false;
      this.submitted = true;
    }
  }
  submit_qualification_form(qualificationForm?: any) {
    return this.registrationService
      .user_submit_qualification_form(qualificationForm)
      .subscribe(
        (data) => {
          console.log("data", data);
          // return false;
          if (!this._USER_IS_PEER) {
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
