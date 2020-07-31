import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectionTableComponent } from "@app/core/components/selection-table/selection-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { MatSortModule } from "@angular/material/sort";
import { MatSliderModule } from "@angular/material/slider";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CategoryFormComponent } from "@app/core/components/category-form/category-form.component";

@NgModule({
  declarations: [SelectionTableComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MaterialBaseModule,
    MatSortModule,
    MatSliderModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  exports: [SelectionTableComponent],
})
export class SelectionTableModule {}
