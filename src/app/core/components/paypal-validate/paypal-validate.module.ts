import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaypalValidateComponent } from "./paypal-validate.component";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [PaypalValidateComponent],
  imports: [
    CommonModule,
    MaterialBaseModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [PaypalValidateComponent],
})
export class PaypalValidateModule {}
