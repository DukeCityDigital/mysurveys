import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../_alert";
import { ParticipantService } from "@app/core/services/participant.service";
import { AuthService } from "@app/core/services/auth.service";
import { tap } from "rxjs/operators";

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
    private participantService: ParticipantService,
    private authenticationService: AuthService
  ) {
    this.friendForm = this.createFriendform();
    this.authenticationService.user.subscribe((x) => (this.user = x));
    this.profileForm = this.createProfileForm();

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getMe();
  }

  getMe() {
    this.participantService.profile()
      .pipe(tap((user: any) => this.profileForm.patchValue(user.data)))

      .subscribe((data: any) => {
        this.user = data.data;
        console.log(this.user);

        if (this.user.friends.length > 0) {
          localStorage.setItem("step", "");

          confirm(
            "Thank you for inviting friends!  You can now receive survey invitations."
          );
        }
      });
  }

  ngOnInit(): void { }

  createFriendform(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl(""),
      custom_message: new FormControl(""),
      nickname: new FormControl("", [Validators.required]),

    });
  }
  profileForm: FormGroup;


  createProfileForm(): FormGroup {
    return this.formBuilder.group({
      nickname: new FormControl(""),

    });
  }

  onSubmitProfileChange() {
    if (!this.profileForm) {
      this.alertService.error(
        "You must fill out the profile change form first"
      );
    }
    this.participantService.update(this.profileForm.value).subscribe((data) => {
      this.getProfile();
    });
  }
  participant: any;

  getProfile() {
    this.participantService
      .profile()
      .pipe(tap((user: any) => this.profileForm.patchValue(user.data)))
      .subscribe((data: any) => {
        this.participant = data.data;
        if (
          !this.participant.changed_pw ||
          this.participant.changed_pw == null
        ) {
        }
        this.alertService.success(data.message, { autoClose: true });
      });
  }

  public inviteFriend(post) {
    if (!this.friendForm) {
      this.alertService.error("You must fill out the friend change form first");
    }
    this.participantService.inviteFriend(post).subscribe(
      (data: any) => {
        this.alertService.success("Invitation sent", { autoClose: true });
        localStorage.setItem("step", "");

        this.getMe();
        this.authenticationService.userValue.step = "";
        console.log(this.authenticationService.userValue);
        // confirm(
        //   "Thank you for inviting friends!  You can now receive survey invitations."
        // );
      },
      (error) => {
        if (error && error.error && error.error.email) {
          this.alertService.error(error.error.email, { autoClose: true });
        } else if (error) {
          this.alertService.error(error.error, { autoClose: true });
        }
      }
    );
  }

  public clickSubmitFriendInvite(email: string) {
    this.friendForm.setValue({ email: email, custom_message: "" });
    let post = {
      email: this.friendForm.value.email,
      nickname: this.friendForm.value.nickname,

      invite: true,
      remind: true,
      custom_message: this.friendForm.value.custom_message,
    };
    this.inviteFriend(post);
  }
  onSubmitFriendInvite() {
    let post = {
      email: this.friendForm.value.email,
      nickname: this.friendForm.value.nickname,

      invite: true,
      custom_message: this.friendForm.value.custom_message,
    };
    if (this.friendForm.value.custom_message == "") {
      delete post.custom_message;
    }
    console.log(post);
    this.inviteFriend(post);
    this.friendForm.reset();
  }
}
