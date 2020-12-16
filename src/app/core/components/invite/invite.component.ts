import { Component, OnInit } from "@angular/core";
import { EmailPattern } from "@app/core/helpers/patterns";
import { AdminService } from "@app/core/services/admin.service";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertService } from "../_alert";
@Component({
  selector: "app-invite",
  templateUrl: "./invite.component.html",
  styleUrls: ["./invite.component.scss"],
})
export class InviteComponent implements OnInit {
  inviteForm: FormGroup;
  emailPattern = EmailPattern;
  message = "";
  invitation_success = false;

  ngOnInit(): void {}

  constructor(
    public alertService: AlertService,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.inviteForm = this.createInviteForm();
  }

  createInviteForm(): FormGroup {
    return this.formBuilder.group({
      nickname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  get f() {
    return this.inviteForm.controls;
  }

  onSubmit() {
    return this.adminService
      .inviteResearcher(this.inviteForm.value)
      .subscribe((data) => {
        this.invitation_success = true;
        this.alertService.success("Successfully sent", { autoClose: true });
      });
  }
}
