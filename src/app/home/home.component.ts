import { Component, OnInit } from "@angular/core";
import { AlertService, Alert } from "@app/core/components/_alert";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { AuthService } from "@app/core/services/auth.service";
import { Router } from "@angular/router";
import { GetStepUrl } from "@app/core/helpers/get-step";

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
    private _bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private router: Router
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let uv = this.authService.userValue;
    console.log("home c uservalue", uv);
    if (uv) {
      let stepUrl = GetStepUrl(uv);
      console.log("red home to stepurl", stepUrl);

      this.router.navigateByUrl(stepUrl);
    }
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
