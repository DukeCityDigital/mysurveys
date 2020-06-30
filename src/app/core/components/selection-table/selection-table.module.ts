import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectionTableComponent } from "@app/core/components/selection-table/selection-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialBaseModule } from "../material-base/material-base.module";

@NgModule({
  declarations: [SelectionTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MaterialBaseModule,
  ],
  exports: [SelectionTableComponent],
})
export class SelectionTableModule {}
