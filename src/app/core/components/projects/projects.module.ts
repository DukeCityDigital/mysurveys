import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";

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
import { ManageParticipantsComponent } from "../manage-participants/manage-participants.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { AlertService, AlertModule } from "../_alert";
import { OmniTableModule } from "../omni-table/omni-table.module";
import { DataModule } from "../data/data.module";

@NgModule({
  declarations: [
    ProjectsComponent,
    CreateComponent,
    UpdateComponent,
    ManageParticipantsComponent,
  ],
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
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    AlertModule,
    OmniTableModule,
    DataModule,
  ],
  providers: [],
})
export class ProjectsModule {}
