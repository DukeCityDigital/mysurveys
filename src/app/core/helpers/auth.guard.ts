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

    if (user) {
      console.log(user.step, state.url);
      if (user.step == "") {
        return true;
      }
      if (user.subrole == "seed" || user.subrole == "friend") {
        console.log(user.step, state.url);
        if (user.step == "paypal" && state.url !== "/dashboard/paypal") {
          return false;
        }
        if (user.step == "friends" && state.url !== "/dashboard/friends") {
          return false;
        }
        if (user.step == "survey" && state.url !== "/questionnaire") {
          return false;
        }
      }
      return true;
    }
    if (state.url == "/questionnaire") {
      return true;
    }
    // not logged in so redirect to login page with the return url
    // this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
