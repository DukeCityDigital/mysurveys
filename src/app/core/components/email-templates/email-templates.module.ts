import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmailTemplatesComponent } from "./email-templates.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EmailTemplatesRoutingModule } from "./email-templates-routing.module";

@NgModule({
  declarations: [EmailTemplatesComponent],
  imports: [
    CommonModule,
    EmailTemplatesRoutingModule,
    MaterialBaseModule,
    MatExpansionModule,
    MatFormFieldModule,
  ],
  exports: [EmailTemplatesComponent],
})
export class EmailTemplatesModule {}
