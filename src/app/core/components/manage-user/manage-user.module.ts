import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageUserComponent } from "./manage-user.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [ManageUserComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  exports: [ManageUserComponent],
})
export class ManageUserModule {}
