import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { PasswordFormModule } from "../password-form/password-form.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialBaseModule,
    MatPaginatorModule,
    PasswordFormModule,
    RouterModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
