import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { PasswordFormModule } from "../password-form/password-form.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, MaterialBaseModule, PasswordFormModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
