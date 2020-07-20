import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MaterialBaseModule } from "@app/core/components/material-base/material-base.module";
import { AlertModule } from "@app/core/components/_alert";
import { ProfileModule } from "@app/core/components/profile/profile.module";
import { FriendsModule } from "@app/core/components/friends/friends.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    MaterialBaseModule,
    AlertModule,
    ProfileModule,
    FriendsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
