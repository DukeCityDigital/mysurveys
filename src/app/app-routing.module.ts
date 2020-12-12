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
import { PasswordResetComponent } from "@app/core/components/password-reset/password-reset.component";
import { ChangePasswordComponent } from "@app/core/components/change-password/change-password.component";
import { VerifyEmailComponent } from "./home/verify-email/verify-email.component";
import { ProfileComponent } from "./core/components/profile/profile.component";
import { FriendsComponent } from "./core/components/friends/friends.component";
import { PaypalValidateComponent } from "./core/components/paypal-validate/paypal-validate.component";
import { LogComponent } from "./core/components/log/log.component";
import { UsersComponent } from "./core/components/users/users.component";
import { MyProjectsComponent } from "./core/components/my-projects/my-projects.component";
import { PayoutsComponent } from "./core/components/payouts/payouts.component";
import { NotificationsComponent } from "./core/components/notifications/notifications.component";
import { ParticipantsComponent } from "./core/components/participants/participants.component";
import { DataComponent } from "./core/components/data/data.component";
import { ManageUserComponent } from "./core/components/manage-user/manage-user.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "my-projects",
        component: MyProjectsComponent,
        data: { roles: [Role.participant] },
      },
      {
        path: "my-projects/:id",
        component: MyProjectsComponent,
        data: { roles: [Role.participant] },
      },
      {
        path: "settings",
        component: SettingsComponent,
        // data: { roles: [Role.administrator] },
      },
      {
        path: "paypal",
        component: PaypalValidateComponent,
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
      {
        path: "friends",
        component: FriendsComponent,
        data: { roles: [Role.administrator, Role.participant] },
      },
      {
        path: "log",
        component: LogComponent,
        data: { roles: [Role.administrator] },
      },
      {
        path: "payouts",
        component: PayoutsComponent,
        data: { roles: [Role.administrator] },
      },

      // {
      //   path: "motd",
      //   component: MotdComponent,
      //   data: { roles: [Role.administrator] },
      // },
      {
        path: "notifications",
        component: NotificationsComponent,
        data: { roles: [Role.administrator] },
      },
      {
        path: "users",
        component: UsersComponent,
        // canActivate: [AuthGuard],
        pathMatch: "full",
        // children: [],
        // data: { roles: [Role.administrator, Role.researcher] },
      },
      {
        path: "manage-user",
        component: ManageUserComponent,
        // canActivate: [AuthGuard],
        data: { roles: [Role.administrator, Role.researcher] },
      },
      {
        path: "manage-user/:id",
        component: ManageUserComponent,
        // canActivate: [AuthGuard],
        data: { roles: [Role.administrator, Role.researcher] },
      },

      {
        path: "participants",
        component: ParticipantsComponent,
        // canActivate: [AuthGuard],
        data: { roles: [Role.administrator, Role.researcher] },
      },
      {
        path: "data",
        component: DataComponent,
        // canActivate: [AuthGuard],
        data: { roles: [Role.administrator, Role.researcher] },
      },
    ],

    canActivate: [AuthGuard],
  },

  {
    path: "selection",
    component: SelectionTableComponent,
    canActivate: [AuthGuard],
    // data: { roles: [Role.administrator, Role.researcher] },
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
  imports: [RouterModule.forRoot(routes)], // <-- debugging purposes only)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
