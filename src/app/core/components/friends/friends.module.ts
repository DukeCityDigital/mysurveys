import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FriendsComponent } from "./friends.component";
import { MaterialBaseModule } from "../material-base/material-base.module";

@NgModule({
  declarations: [FriendsComponent],
  imports: [CommonModule, MaterialBaseModule],
  exports: [FriendsComponent],
})
export class FriendsModule {}
