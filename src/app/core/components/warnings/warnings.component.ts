import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-warnings",
  templateUrl: "./warnings.component.html",
  styleUrls: ["./warnings.component.scss"],
})
export class WarningsComponent implements OnInit {
  title = "Warnings";
  actions = [{ name: "warn" }, { name: "ban" }];
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
      let item = { name: element, type: element };
      obj.push(item);
    });
    this.columns = obj;
  }

  ngOnInit(): void {}
}
