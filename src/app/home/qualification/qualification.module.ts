import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QualificationComponent } from "./qualification.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { VerificationModule } from "../verification/verification.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
@NgModule({
  declarations: [QualificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    VerificationModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [QualificationComponent],
})
export class QualificationModule {}
