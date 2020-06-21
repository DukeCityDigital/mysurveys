import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SettingsComponent } from "@app/core/components/settings/settings.component";

// const routes: Routes = [{ path: "settings2", component: SettingsComponent }];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
