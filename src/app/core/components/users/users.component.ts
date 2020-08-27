import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  title = "Users";
  columns = [
    "id",
    "activated",
    "banned",
    "banned_date",
    "banned_reason",
    "created_at",

    "email",
    "email_verified_at",

    "last_login",
    "updated_at",
    "username",
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
