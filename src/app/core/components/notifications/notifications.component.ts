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
    // "email",
    // "regdate",
    // "last_login",
    // "last_update",
    // "banned",
    // "banned_reason",
    // "banned_date",
    // "activated",
    // "registration_key",
    // "nickname",
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
