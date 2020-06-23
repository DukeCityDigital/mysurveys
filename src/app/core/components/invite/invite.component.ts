import { Component, OnInit } from "@angular/core";
import { EmailPattern, PasswordPattern } from "@app/core/helpers/patterns";
import { AdminService } from "@app/core/services/admin.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-invite",
  templateUrl: "./invite.component.html",
  styleUrls: ["./invite.component.scss"],
})
export class InviteComponent implements OnInit {
  inviteForm: FormGroup;
  emailPattern = EmailPattern;
  message = "";

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.inviteForm = this.createInviteForm();
  }

  ngOnInit(): void {}
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
        this.message = "Successfully sent";
      });
  }
}
