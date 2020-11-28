import { Component, OnInit } from "@angular/core";
import { ParticipantService } from "@app/core/services/participant.service";
import { ParticipantsComponent } from "../participants/participants.component";
import { AlertService } from "../_alert";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  title = "Users";
  actions = [{ name: "edit", link: "./update" }];

  columns = [
    { name: "id", type: "any" },
    { name: "email", type: "string" },
    { name: "banned_reason", type: "string" },
    { name: "banned_date", type: "string" },
    { name: "activated", type: "string" },
    { name: "paypal_id", type: "string" },
  ];

  constructor(
    private participantService: ParticipantService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  /**
   * Emit submitted row
   * @param event
   */
  public submitRowEmit(event) {
    console.log(event);
    let vname = event.name;
    let value = event.value;
    let post = { id: event.id, [vname]: value };
    this.participantService.update(post).subscribe((resp) => {
      console.log("update P resp", resp);
      if (resp.success) {
        this.alertService.success("Updated successfully", {
          id: "da",
          autoClose: true,
        });
      } else {
        this.alertService.error("There was an error");
      }
    });
  }
}
