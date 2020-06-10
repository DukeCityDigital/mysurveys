import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  showGdpr: boolean;
  constructor() {}

  ngOnInit(): void {
    var data = sessionStorage.getItem("showgdpr");
    if (data == "false") {
      this.showGdpr = false;
    } else {
      this.showGdpr = true;
    }
  }

  acknowledgeGDPR() {
    this.showGdpr = false;
    sessionStorage.setItem("showgdpr", "false");
  }
}
