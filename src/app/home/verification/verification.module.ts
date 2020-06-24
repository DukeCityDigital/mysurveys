import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VerificationComponent } from "./verification.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
RouterModule
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RECAPTCHA_SETTINGS,
} from "ng-recaptcha";
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [VerificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatIconModule,
    RouterModule
  ],
  exports: [VerificationComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
      },
    },
  ],
})
export class VerificationModule { }
