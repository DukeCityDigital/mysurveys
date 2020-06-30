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
import { SettingsComponent } from "@app/core/components/settings/settings.component";
import { ProjectsComponent } from "@app/core/components/projects/projects.component";
import { CreateComponent } from "@app/core/components/projects/create/create.component";
import { PasswordResetComponent } from "@app/core/components/password-reset/password-reset.component";
import { ChangePasswordComponent } from "@app/core/components/change-password/change-password.component";
import { VerifyEmailComponent } from "./home/verify-email/verify-email.component";
import { ProfileComponent } from "./core/components/profile/profile.component";

VerifyEmailComponent;

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "settings",
        component: SettingsComponent,
        // data: { roles: [Role.administrator] },
      },
      {
        path: "projects",
        loadChildren: () =>
          import(`./core/components/projects/projects.module`).then(
            (m) => m.ProjectsModule
          ),
        // component: ProjectsComponent,
        // // children: [{ path: "create", component: CreateComponent }],
        // data: { roles: [Role.administrator, Role.researcher] },
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
    ],
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
  { path: "login/:email", component: LoginComponent },

  { path: "privacy", component: PrivacyComponent },
  // todo remove
  { path: "create", component: VerificationComponent },

  { path: "verify/:code", component: VerificationComponent },

  { path: "verify-email", component: VerifyEmailComponent },

  { path: "password-reset", component: PasswordResetComponent },
  { path: "change-password/:code", component: ChangePasswordComponent },

  // {
  //   path: "Projects",
  //   loadChildren: () =>
  //     import("./core/components/projects/projects.module").then(
  //       (m) => m.ProjectsModule
  //     ),
  // },

  { path: "", redirectTo: "/home", pathMatch: "full" },

  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
