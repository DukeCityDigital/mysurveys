import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { ActivatedRoute } from "@angular/router";
import { User } from "@app/core/models/user";
import { ParticipantService } from "@app/core/services/participant.service";
import { first } from "rxjs/internal/operators/first";
import { AlertService } from "../_alert";
AlertService;
@Component({
  selector: "app-manage-user",
  templateUrl: "./manage-user.component.html",
  styleUrls: ["./manage-user.component.scss"],
})
export class ManageUserComponent implements OnInit {
  user_id: number;
  formGroup: FormGroup;
  userForm: FormGroup;
  loaded: boolean = false;
  user: User;

  constructor(
    private participantService: ParticipantService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.userForm = this.formBuilder.group({
      id: [""],
      email: new FormControl({ value: "" }, Validators.required),
      banned_reason: [""],
      banned: [""],
      warnings: [""],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.user_id = +params.params.id;
      if (this.user_id) {
        this.getUser(this.user_id);
      } else {
        // blankform
        // this.toggleEditCreate();
      }
    });
  }

  /**
   * Get user info from backend
   * @param user_id
   */
  getUser(user_id) {
    this.participantService.getUser(user_id).subscribe((r) => {
      console.log(r);
      this.user = r;
      this.patchFormValues(r);
    });
  }

  patchFormValues(r?) {
    let formValues = {
      banned: r.banned,
      email: r.email,
      banned_reason: r.banned_reason,
      id: r.id,
      warnings: r.warnings,
    };
    this.userForm.patchValue(formValues);
    this.userForm.controls.email.disable();
  }

  /**
   * Submit project edit form
   */
  onSubmit() {
    console.log("submitform");
    this.participantService
      .updateUser(this.userForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          if (data.id) {
            this.alertService.success("Updated successfully", {
              autoClose: true,
              id: "da",
            });
            this.user = data;
            this.patchFormValues(data);
          } else {
            this.alertService.error("Error", { autoClose: true });
          }
        },
        (error) => {}
      );
  }
}
