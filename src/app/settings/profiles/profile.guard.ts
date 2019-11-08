import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { merge, Observable, of } from "rxjs";
import { ProfilesService } from "./profiles.service";
import { filter, mapTo, tap } from "rxjs/operators";
import { matTooltipAnimations } from "@angular/material/tooltip";
import { AppConfig } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProfileGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly profilesService: ProfilesService
  ) {
    this.profilesService.getProfiles();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const profiles = this.profilesService.profiles;
    // TODO this should be removed and used only as false
    return of(true);
    // return merge(
    //   profiles.pipe(
    //     filter(profiles => profiles.length === 0),
    //     tap(() => this.showWarningMessage()),
    //     tap(() => this.redirectToProfiles()),
    //     mapTo(false)
    //   ),
    //   profiles.pipe(
    //     filter(profiles => profiles.length > 0),
    //     mapTo(true)
    //   )
    // );
  }

  private showWarningMessage() {}

  private redirectToProfiles() {
    this.router.navigate(["profiles"]);
  }
}
