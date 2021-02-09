import { Component, OnInit } from "@angular/core";
import { AlertService, Alert } from "@app/core/components/_alert";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";

AlertService;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  showGdpr: boolean;

  constructor(
    private alertService: AlertService,
    private _bottomSheet: MatBottomSheet
  ) {}
  openBottomSheet(): void {
    this._bottomSheet.open(GDPRBottomSheet);
  }
  ngOnInit(): void {
    // GDPR hard coded for roles in this version
    // var data = sessionStorage.getItem("showgdpr");
    // if (data == "false") {
    //   this.showGdpr = false;
    // } else {
    //   this.showGdpr = true;
    //   this.openBottomSheet();
    // }
  }

  acknowledgeGDPR() {
    this.showGdpr = false;
    sessionStorage.setItem("showgdpr", "false");
  }
}
@Component({
  selector: "gdpr-bottom-sheet",
  templateUrl: "gdpr-bottom-sheet.html",
  styles: [".bottom-sheet {font-size:18px;}"],
})
export class GDPRBottomSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<HomeComponent>) {
    _bottomSheetRef.disableClose = true;
  }

  acknowledgeGDPR() {
    // this.showGdpr = false;
    this._bottomSheetRef.dismiss();

    sessionStorage.setItem("showgdpr", "false");
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
