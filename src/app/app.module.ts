import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { QualificationModule } from "./home/qualification/qualification.module";
import { HomeComponent } from "./home/home.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { PrivacyComponent } from "./home/privacy/privacy.component";
import { LoginModule } from "./home/login/login.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { JwtInterceptor } from "@app/core/helpers/jwt.interceptor";
import { ErrorInterceptor } from "@app/core/helpers/error.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { SelectionTableComponent } from "./core/components/selection-table/selection-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivacyComponent,
    DashboardComponent,
    SelectionTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    QualificationModule,
    MatDividerModule,
    MatListModule,
    LoginModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function jwtTokenGetter() {
  return localStorage.getItem("access_token");
}
