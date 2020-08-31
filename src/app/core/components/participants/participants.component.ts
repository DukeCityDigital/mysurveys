import { Component, OnInit } from "@angular/core";
import { ParticipantService } from "@app/core/services/participant.service";
import { AlertService } from "../_alert";

@Component({
  selector: "app-participants",
  templateUrl: "./participants.component.html",
  styleUrls: ["./participants.component.scss"],
})
export class ParticipantsComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private participantService: ParticipantService
  ) {}

  actions = [{ name: "warn" }, { name: "ban" }];

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

  columns = [
    { name: "id", type: "any" },
    { name: "email", type: "string" },
    { name: "banned_reason", type: "string" },
    { name: "banned_date", type: "string" },
    { name: "activated", type: "string" },
    { name: "paypal_id", type: "string" },
    {
      name: "paypal_id_status",
      type: "select",
      edit: true,
      options: ["New", "Invalid", "Ok"],
    },
    { name: "paypal_me", type: "string" },

    { name: "is_banned", type: "string" },
    { name: "warnings", type: "string" },
    // { name: "actions", type: "string", edit: true },
  ];

  ngOnInit(): void {}
}
