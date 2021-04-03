import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  RouterState,
} from "@angular/router";
import { SetRole } from "@app/core/helpers/set-role";

import { AuthService } from "@app/core/services/auth.service";
import { GetStepUrl } from "./get-step";

// class Permissions {
//   canGoToRoute(user: UserToken, id: string): boolean {
//     return true;
//   }
// }
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthService // private routerStateSnapshot: RouterStateSnapshot
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let cu = SetRole(this.authenticationService.userValue);
    const user = cu;
    if (user) {
      // logged in so return true
      // check if route is restricted by role
      if (user.mustVerify) {
        this.router.navigate(["/verify-email"]);
        return false;
      }

      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(["/home"]);
        return false;
      }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
@Injectable({ providedIn: "root" })
export class StepGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthService // private routerStateSnapshot: RouterStateSnapshot
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let cu = SetRole(this.authenticationService.userValue);
    const user = cu;
    console.log("user", user, state.url);
    if (user) {
      if (user.role == "researcher" || user.role == "administrator") {
        return true;
      }
      if (user.step == "") {
        return true;
      }
      if (state.url.indexOf("/questionnaire") > -1) {
        return true;
      }

      var userStepUrl = GetStepUrl(user);
      console.log(
        "userstepurl",
        userStepUrl,
        state.url,
        state.url.indexOf(userStepUrl)
      );
      if (
        state.url.indexOf(userStepUrl) < 0
        // ||
        // (user.step == "questionnaire" && state.url.indexOf("questionnaire") < 0)
      ) {
        return false;
      }
      return true;
    }
    return true;
    if (
      state.url.indexOf("/questionnaire") > -1 ||
      state.url.indexOf("/dashboard/my-projects") > -1
    ) {
      return true;
    }
    return false;
  }

  public navigate(target: string) {
    this.router.navigate[target];
  }
}
