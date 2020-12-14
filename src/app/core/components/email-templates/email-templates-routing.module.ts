import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TemplateCreateComponent } from "../template-create/template-create.component";
import { EmailTemplatesComponent } from "./email-templates.component";

// import { ProjectsComponent } from "./projects.component";
// import { CreateComponent } from "./create/create.component";
// import { UpdateComponent } from "./update/update.component";

const routes: Routes = [
  { path: "project/:id", component: EmailTemplatesComponent },
  { path: "project/:id/update/:eid", component: EmailTemplatesComponent },

  { path: "project/:id/create", component: TemplateCreateComponent },
  // { path: "update/:id", component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailTemplatesRoutingModule {}
