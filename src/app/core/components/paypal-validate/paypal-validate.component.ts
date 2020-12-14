import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertService } from "../_alert";
import { ParticipantService } from "@app/core/services/participant.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private participantService: ParticipantService
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
    this.participantService.get().subscribe((data: any) => {
      this.user = data.data;
    });
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
        },
        (error) => {
          if (error && error.error) {
            this.alertService.error(error.error.message, { autoClose: true });
          }
        }
      );
  }
}
