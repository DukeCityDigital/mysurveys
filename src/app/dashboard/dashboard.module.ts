import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MaterialBaseModule } from "@app/core/components/material-base/material-base.module";
@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, CommonModule, MaterialBaseModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
