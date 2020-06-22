import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProjectsComponent } from "./projects.component";
import { CreateComponent } from "./create/create.component";
import { UpdateComponent } from "./update/update.component";

const routes: Routes = [
  { path: "", component: ProjectsComponent },
  { path: "create", component: CreateComponent },
  { path: "update/:id", component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
