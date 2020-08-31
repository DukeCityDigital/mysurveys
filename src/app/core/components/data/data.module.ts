import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DataComponent } from "./data.component";
import { MaterialBaseModule } from "../material-base/material-base.module";

@NgModule({
  declarations: [DataComponent],
  imports: [CommonModule, MaterialBaseModule],
  exports: [DataComponent],
})
export class DataModule {}
