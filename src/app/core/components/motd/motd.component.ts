import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/core/services/admin.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { AlertService } from "../_alert";

@Component({
  selector: "app-motd",
  templateUrl: "./motd.component.html",
  styleUrls: ["./motd.component.scss"],
})
export class MotdComponent implements OnInit {
  settings: any;
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  motdForm: FormGroup;

  ngOnInit(): void {
    this.adminService.getSettings().subscribe((data) => {
      console.log(data);
      this.settings = data.data;
      this.motdForm = this.formBuilder.group({
        researchermessage: this.settings.researchermessage,
        participantmessage: this.settings.participantmessage,
      });
    });
  }

  onSubmit() {
    let post = this.motdForm.value;
    post.id = 1;
    this.adminService.updateSettings(post).subscribe((resp) => {
      console.log("update resp", resp);
      this.alertService.success("MOTD updated", { id: "da" });
    });
  }
}
