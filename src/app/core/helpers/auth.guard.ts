import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { SetRole } from "@app/core/helpers/set-role";

import { AuthService } from "@app/core/services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let cu = SetRole(this.authenticationService.userValue);
    const user = cu;
    // console.log("can activate", cu);
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
