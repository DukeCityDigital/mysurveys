import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { ProjectsRoutingModule } from "./projects-routing.module";
import { ProjectsComponent } from "./projects.component";
import { CreateComponent } from "./create/create.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialBaseModule } from "@app/core/components/material-base/material-base.module";
import { UpdateComponent } from "./update/update.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { SelectionTableModule } from "../selection-table/selection-table.module";
import { EmailTemplatesModule } from "../email-templates/email-templates.module";

@NgModule({
  declarations: [ProjectsComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialBaseModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    SelectionTableModule,
    EmailTemplatesModule,
  ],
})
export class ProjectsModule {}
