import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  constructor() {}
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
    "registratio_key",
    "nickname",
  ];

  ngOnInit(): void {}
}
