import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProjectsComponent } from "./projects.component";
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
  { path: "", component: ProjectsComponent },
  { path: "create", component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
