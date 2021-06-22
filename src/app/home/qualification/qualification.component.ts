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
import { AuthService } from "@app/core/services/auth.service";

import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ParticipantService } from "@app/core/services/participant.service";
import { User } from "@app/core/models/user";
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
      vac_receive: new FormControl("", [Validators.required]),
      vac_benefit: new FormControl("", [Validators.required]),
      vac_effective: new FormControl("", [Validators.required]),
      vac_harmful: new FormControl("", [Validators.required]),
      vac_pharma: new FormControl("", [Validators.required]),
      share: new FormControl("", [Validators.required]),

      share_info: new FormControl("", [Validators.required]),
      us: new FormControl("", [Validators.required]),
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
        this.qualified = data.data.qualified;
        this.remakeForm();
        if (this.user.survey_complete) {
          this.submitted = true;
        }
      });
    } else {
      this._USER_IS_PEER = false;
      this.remakeForm();
    }
    console.log(this.qualificationForm);
  }

  remakeForm() {
    if (this._USER_IS_PEER) {
      this.qualificationForm.removeControl("friends");
    } else {
      this.qualificationForm.removeControl("share_data");
    }
  }
  VacPharmaResponses = [
    { name: "Big pharmaceutical companies benefit too much at the expense of patients", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "Both big pharmaceutical companies and patients benefit equally", value: 7 },
  ];
  VacHarmfulResponses = [
    { name: "Very harmful", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "Not harmful at all", value: 7 },
  ];
  VacPossibleResponses = [
    { name: "I will definitely not get the flu vaccine", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "I will definitely get the flu vaccine", value: 7 },
  ];
  VacEffectiveResponses = [
    { name: "Very ineffective", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "Very effective", value: 7 },
  ];
  FluPossibleResponses = [
    { name: "I will definitely not get the flu vaccine", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "I will definitely get the flu vaccine", value: 7 },
  ];
  BenefitPossibleResponses = [
    { name: "The risks completely outweigh the benefits", value: 1 },
    { name: "", value: 2 },
    { name: "", value: 3 },
    { name: "The risks and benefits are about equal", value: 4 },
    { name: "", value: 5 },
    { name: "", value: 6 },
    { name: "The benefits completely outweigh the risks", value: 7 },
  ];
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
    // updated per TDD
    let vacReceive = parseInt(f.vac_receive) !== 1 && parseInt(f.vac_receive) !== 7;
​
    let benefitOk = parseInt(f.vac_benefit) !== 1 && parseInt(f.vac_benefit) !== 7;
​
    let effectiveOk = parseInt(f.vac_effective) !== 1 && parseInt(f.vac_effective) !== 7;
​
    let harmfulOk = parseInt(f.vac_harmful) !== 1 && parseInt(f.vac_harmful) !== 7;
​
    let pharmaOk = parseInt(f.vac_pharma) !== 1 && parseInt(f.vac_pharma) !== 7;
​
    let usOk = f.us === "true";
    let shareOk = f.share === "true";
    let share_infoOk = f.share_info === "true";
​
    if (shareOk && share_infoOk && usOk) {
      qualified = true;
    } else {
      qualified = false;
    }
    this.qualified = qualified;
    return this.qualified;
  }

  peerQualified: boolean = false;

  onSubmit() {
    console.log("submit", this.qualificationForm);
    // if no user do regular routine, otherwise send form directly
    if (!this.qualificationForm) {
      this.alertService.error("You must fill out the qualification form first");
      return false;
    }
    let f = this.qualificationForm.value;
    f.qualified = this.isQualified(this.qualificationForm);
    console.log("F qualified peer", this._USER_IS_PEER, f);
    if (!this._USER_IS_PEER) {
      f.seed = true;
      if (f.qualified) {
        // this.submit_qualification_form(f);
        this.submitted = true;
        this.qualified = true;
      } else {
        this.qualified = false;
        this.submitted = true;
      }
    } else {
      f.friends = null;

      if (f.qualified) {
        this.submit_qualification_form(f);
        this.submitted = true;
        this.peerQualified = true;
        alert(
          "Thanks for completing the questionnaire, please validate your PayPal account now"
        );
        this.authService.userValue.step = "paypal";
        localStorage.setItem("step", "paypal");

        this.router.navigate(["/dashboard/paypal"]);
      } else {
        this.peerQualified = false;
        this.submit_qualification_form(f);

        alert("Sorry, you're not qualified for any current studies");

        this.router.navigate(["dashboard/my-projects"]);
        return false;
      }
    }

    // if (!this._USER_IS_PEER) {
    //   f.seed = true;
    // } else if (
    //   this._USER_IS_PEER &&
    //   !this.isQualified(this.qualificationForm)
    // ) {
    //   alert("Sorry, you're not qualified for any current studies");
    //   this.router.navigate(["my-projects"]);
    //   return false;
    // } else if (this._USER_IS_PEER && this.isQualified(this.qualificationForm)) {
    //   f.friends = null;
    //   this.submit_qualification_form(f);
    // }
    // // Seeds don't get this far
    // if (this.isQualified(this.qualificationForm)) {
    //   this.submitted = true;
    //   this.qualified = true;
    // } else {
    //   this.qualified = false;
    //   this.submitted = true;
    // }
    // if (!this._USER_IS_PEER) {
    //   alert(
    //     "Thanks for completing the questionnaire, please validate your PayPal account now"
    //   );
    //   this.authService.userValue.step = "paypal";
    //   this.router.navigate(["/dashboard/paypal"]);
    // } else {
    //   this.submit_qualification_form(f);
    // }
  }
  hideQualificationMessage: boolean = false;
  getNotification(evt) {
    this.hideQualificationMessage = true;
  }
  submit_qualification_form(qualificationForm?: any) {
    return this.registrationService
      .user_submit_qualification_form(qualificationForm)
      .subscribe(
        (data) => {
          console.log(data);
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
