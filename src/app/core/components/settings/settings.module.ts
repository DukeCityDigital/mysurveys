import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { MatTabsModule } from "@angular/material/tabs";
import { InviteComponent } from "@app//core/components/invite/invite.component";
import { MatInputModule } from "@angular/material/input";
import { MaterialBaseModule } from "@app/core/components/material-base/material-base.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SettingsComponent, InviteComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    MatInputModule,
    MaterialBaseModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
