import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaypalValidateComponent } from "./paypal-validate.component";
import { MaterialBaseModule } from "../material-base/material-base.module";

@NgModule({
  declarations: [PaypalValidateComponent],
  imports: [CommonModule, MaterialBaseModule],
  exports: [PaypalValidateComponent],
})
export class PaypalValidateModule {}
