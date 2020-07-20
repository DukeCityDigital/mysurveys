import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertService } from "../_alert";
import { ParticipantService } from "@app/core/services/participant.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"],
})
export class FriendsComponent implements OnInit {
  friendForm: FormGroup;

  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private participantService: ParticipantService
  ) {
    this.friendForm = this.createFriendform();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getMe();
  }

  getMe() {
    this.participantService.get().subscribe((data: any) => {
      this.user = data.data;
      console.log(this.user);
    });
  }

  ngOnInit(): void {}

  createFriendform(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl(""),
    });
  }
  onSubmitFriendInvite() {
    console.log("friendchange", this.friendForm.value.email);
    if (!this.friendForm) {
      this.alertService.error("You must fill out the friend change form first");
    }
    this.participantService.inviteFriend(this.friendForm.value.email).subscribe(
      (data: any) => {
        console.log(data);
        this.alertService.success("Invitation sent", { autoClose: true });
        this.getMe();
      },
      (error) => {
        console.log("Error", error);
        if (error && error.error && error.error.email) {
          this.alertService.error(error.error.email, { autoClose: true });
        } else if (error) {
          this.alertService.error(error.error, { autoClose: true });
        }
      }
    );
  }
}