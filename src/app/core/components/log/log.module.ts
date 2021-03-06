import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LogComponent } from "./log.component";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialBaseModule } from "../material-base/material-base.module";
import { MatSortModule } from "@angular/material/sort";
import { MatSliderModule } from "@angular/material/slider";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MaterialBaseModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  exports: [LogComponent],
})
export class LogModule {}
