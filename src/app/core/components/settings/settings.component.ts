import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/core/services/admin.service";
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  settings: any;
  resultArray = [];

  ngOnInit(): void {
    this.adminService.getSettings().subscribe((r) => {
      console.log(r);
      this.settings = r.data;
      this.resultArray = Object.keys(r.data).map(function (i) {
        let person = r.data[i];
        // do something with person
        return person;
      });
      // console.log(this.resultArray[0]);
      this.settings = this.resultArray[0];
    });
  }
}
