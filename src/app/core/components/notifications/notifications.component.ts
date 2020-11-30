import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  title = "Notifications";
  actions = [{ name: "Remind" }, { name: "Invite" }];
  columns = [
    "safeid",
    "invited",
    "started",
    "finished",
    "participants_userid",
    "projects_projectid",
  ];
  constructor() {
    var obj = [];
    this.columns.forEach((element) => {
      let item = { name: element, type: element };
      obj.push(item);
    });
    this.columns = obj;
  }

  ngOnInit(): void {}
}
