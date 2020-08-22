import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyProjectsComponent } from "./my-projects.component";
import { MaterialBaseModule } from "../material-base/material-base.module";

@NgModule({
  declarations: [MyProjectsComponent],
  imports: [CommonModule, MaterialBaseModule],
  exports: [MyProjectsComponent],
})
export class MyProjectsModule {}
