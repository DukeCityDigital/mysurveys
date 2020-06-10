import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QualificationComponent } from "./home/qualification/qualification.component";
import { HomeComponent } from "./home/home.component";
import { VerificationComponent } from "./home/verification/verification.component";
import { PrivacyComponent } from "./home/privacy/privacy.component";
import { LoginComponent } from "@app/home/login/login.component";
import { DashboardComponent } from "@app/dashboard/dashboard.component";
import { AuthGuard } from "@app/core/helpers/auth.guard";
import { Role } from "@app/core/models/role";
import { SelectionTableComponent } from "@app/core/components/selection-table/selection-table.component";
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "selection",
    component: SelectionTableComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.administrator, Role.researcher] },
  },

  {
    path: "qualification",
    component: QualificationComponent,
  },
  {
    path: "questionnaire",
    component: QualificationComponent,
  },
  // data: { roles: [Role.administrator] },

  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },

  { path: "privacy", component: PrivacyComponent },
  // todo remove
  { path: "create", component: VerificationComponent },

  { path: "verify/:code", component: VerificationComponent },

  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
