import { Component, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertService } from "../_alert";
import { ParticipantService } from "@app/core/services/participant.service";
import { EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/services/auth.service";
import { GetStepUrl } from "@app/core/helpers/get-step";

@Component({
  selector: "app-paypal-validate",
  templateUrl: "./paypal-validate.component.html",
  styleUrls: ["./paypal-validate.component.scss"],
})
export class PaypalValidateComponent implements OnInit {
  paypalForm: FormGroup;
  showInfoMe: boolean = false;
  showInfo: boolean = false;
  user: any;
  confirmedPaypalMe: string;
  returnedPaypalMe: string;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private participantService: ParticipantService,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.paypalForm = this.createPaypalForm();
  }

  ngOnInit(): void {
    this.getMe();
  }
  get f() {
    return this.paypalForm.controls;
  }

  createPaypalForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      paypalme: new FormControl("", [Validators.required]),
    });
  }
  getMe() {
    this.participantService.profile().subscribe((data: any) => {
      this.user = data.data;
    });
  }

  onNotifyParent() {
    this.notifyParent.emit({ update: true });
  }

  onSubmitPaypalForm() {
    if (!this.paypalForm) {
      this.alertService.error("You must fill out the Paypal form first");
    }

    this.participantService
      .validatePaypal(
        this.paypalForm.value.email,
        this.paypalForm.value.paypalme
      )
      .subscribe(
        (data: any) => {
          this.confirmedPaypalMe = data.data;
          this.alertService.success("Updated", { autoClose: true });
          this.getMe();
          this.notifyParent.emit({ update: true });
          var userStepUrl = GetStepUrl(this.user);

          if (this.user.subrole == "friend") {
            if (userStepUrl.indexOf("paypal") > -1) {
              localStorage.setItem("step", "");
              this.authenticationService.userValue.step = "";
              localStorage.setItem("step", "questionnaire");
            }
            confirm(
              "Thank you for validating your PayPal! Next you will be directed to the surveys page "
            );
            this.router.navigate(["/dashboard/my-projects"]);
          } else if (this.user.subrole == "seed") {
            if (userStepUrl.indexOf("paypal") > -1) {
              this.authenticationService.userValue.step = "friends";
              localStorage.setItem("step", "friends");

              confirm(
                "Thank you for validating your PayPal! Next you will be directed to the page to invite your friends "
              );
              this.router.navigate(["/dashboard/friends"]);
            }
          }
        },
        (error) => {
          if (error && error.error) {
            this.alertService.error(error.error.message, { autoClose: true });
          }
        }
      );
  }
}
