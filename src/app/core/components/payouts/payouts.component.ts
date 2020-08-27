import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payouts",
  templateUrl: "./payouts.component.html",
  styleUrls: ["./payouts.component.scss"],
})
export class PayoutsComponent implements OnInit {
  options = { forceColumns: true };
  actions = [{ name: "Initiate payment" }];

  public columns = [
    "safeid",
    "amount_to_pay",
    "invited",

    "started",
    "finished",
    "paymentconfirmed",
    "paymentorders_payorderid",

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
