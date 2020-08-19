import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MaterialBaseModule } from "@app/core/components/material-base/material-base.module";
import { AlertModule } from "@app/core/components/_alert";
import { ProfileModule } from "@app/core/components/profile/profile.module";
import { FriendsModule } from "@app/core/components/friends/friends.module";
import { PaypalValidateModule } from "@app/core/components/paypal-validate/paypal-validate.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { LogModule } from "@app/core/components/log/log.module";
import { OmniTableModule } from "@app/core/components/omni-table/omni-table.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    MaterialBaseModule,
    AlertModule,
    ProfileModule,
    FriendsModule,
    PaypalValidateModule,
    MatPaginatorModule,
    LogModule,
    OmniTableModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
