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
    "email",
    "regdate",
    "last_login",
    "last_update",
    "banned",
    "banned_reason",
    "banned_date",
    "activated",
    "registration_key",
    "nickname",
  ];

  constructor() {
    var obj = [];
    this.columns.forEach((element) => {
      let item = { name: element };
      obj.push(item);
    });
    this.columns = obj;
  }

  ngOnInit(): void {}
}
