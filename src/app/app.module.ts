import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { QualificationModule } from "./home/qualification/qualification.module";
import { HomeComponent } from "./home/home.component";
import { PrivacyComponent } from "./home/privacy/privacy.component";
import { LoginModule } from "./home/login/login.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DashboardModule } from "./dashboard/dashboard.module";
import { JwtInterceptor } from "@app/core/helpers/jwt.interceptor";
import { ErrorInterceptor } from "@app/core/helpers/error.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { SelectionTableComponent } from "./core/components/selection-table/selection-table.component";
import { MaterialBaseModule } from "@app/core/components/material-base/material-base.module";
import { SettingsModule } from "@app/core/components/settings/settings.module";
import { PasswordResetComponent } from "./core/components/password-reset/password-reset.component";
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RECAPTCHA_SETTINGS,
} from "ng-recaptcha";
RouterModule;
import { VerifyEmailComponent } from "./home/verify-email/verify-email.component";
import { RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./core/components/change-password/change-password.component";
import { AlertModule } from "@app/core/components/_alert";
import { ProfileModule } from "./core/components/profile/profile.module";
import { CheckMaxLevelsComponent } from './core/components/check-max-levels/check-max-levels.component';
import { CheckExpectedLevelsComponent } from './core/components/check-expected-levels/check-expected-levels.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivacyComponent,
    // SelectionTableComponent,
    PasswordResetComponent,
    VerifyEmailComponent,
    ChangePasswordComponent,
    CheckMaxLevelsComponent,
    CheckExpectedLevelsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    QualificationModule,
    LoginModule,
    HttpClientModule,
    MaterialBaseModule,
    DashboardModule,
    SettingsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RouterModule,
    AlertModule,
    ProfileModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: ["localhost:3000", "websurvey"],
        blacklistedRoutes: ["http://localhost:3000/auth/login"],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function jwtTokenGetter() {
  return localStorage.getItem("access_token");
}
