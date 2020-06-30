import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, MaterialBaseModule, MatExpansionModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
