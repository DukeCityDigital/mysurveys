import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "./alert.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { MatChipsModule } from "@angular/material/chips";
// import { MultiAlertsComponent } from './multi-alerts/multi-alerts.component';

@NgModule({
  imports: [CommonModule, MaterialBaseModule, MatChipsModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
})
export class AlertModule {}
