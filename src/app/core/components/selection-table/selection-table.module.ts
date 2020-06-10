import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectionTableComponent } from "@app/core/components/selection-table/selection-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [SelectionTableComponent],
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  exports: [SelectionTableComponent],
})
export class SelectionTableModule {}
