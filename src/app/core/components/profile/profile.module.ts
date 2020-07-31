import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { PasswordFormModule } from "../password-form/password-form.module";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialBaseModule,
    MatPaginatorModule,
    PasswordFormModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
