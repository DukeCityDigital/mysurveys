import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { PasswordFormModule } from "../password-form/password-form.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { PaypalValidateModule } from "../paypal-validate/paypal-validate.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialBaseModule,
    MatPaginatorModule,
    PasswordFormModule,
    RouterModule,
    PaypalValidateModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
