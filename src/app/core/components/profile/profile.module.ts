import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { MaterialBaseModule } from "../material-base/material-base.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, MaterialBaseModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
