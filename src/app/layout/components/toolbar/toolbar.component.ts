import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter, map, switchMap, take, takeUntil, tap } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { Router } from "@angular/router";
import { ProfilesService } from "../../../settings/profiles/profiles.service";
import { Profile } from "../../../settings/profiles/profile.data";

interface Language {
  id: string;
  title: string;
  flag: string;
}

interface StatusOption {
  title: string;
  icon: string;
  color: string;
}

@Component({
  selector: "toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private destroyer = new Subject();

  public horizontalNavbar: boolean;
  public rightNavbar: boolean;
  public hiddenNavbar: boolean;
  public languages: Language[];
  public navigation = this.fuseNavigationService.navigation;
  public selectedLanguage: Language = null;

  // TODO instead of show user status, we need to show server status, online or offline
  public userStatusOptions: StatusOption[] = [
    { title: "Online", icon: "icon-checkbox-marked-circle", color: "#4CAF50" },
    { title: "Away", icon: "icon-clock", color: "#FFC107" },
    { title: "Do not Disturb", icon: "icon-minus-circle", color: "#F44336" },
    {
      title: "Invisible",
      icon: "icon-checkbox-blank-circle-outline",
      color: "#BDBDBD"
    },
    {
      title: "Offline",
      icon: "icon-checkbox-blank-circle-outline",
      color: "#616161"
    }
  ];

  public profile: Profile = null;
  public profiles: Profile[] = [];

  constructor(
    private readonly router: Router,
    private readonly profilesService: ProfilesService,
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
    private readonly fuseNavigationService: FuseNavigationService
  ) {
    // TODO dynamic languages
    this.languages = [{ id: "en", title: "English", flag: "us" }];
  }

  public ngOnInit(): void {
    this._fuseConfigService.config
      .pipe(takeUntil(this.destroyer))
      .subscribe(settings => {
        this.horizontalNavbar = settings.layout.navbar.position === "top";
        this.rightNavbar = settings.layout.navbar.position === "right";
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this.selectedLanguage = this.languages.find(
      language => language.id === this._translateService.currentLang
    );
    this.profilesService.getProfiles();
    this.profilesService.profiles
      .pipe(takeUntil(this.destroyer))
      .subscribe(profiles => {
        this.profiles = profiles.filter(
          profile => !profile.deleted && !profile.selected
        );
        this.profile = profiles.find(
          profile => !profile.deleted && profile.selected
        );
      });
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  public toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  public search(value): void {
    console.log(value);
  }

  /**
   * Set the language
   *
   * @param lang
   */
  public setLanguage(lang): void {
    this.selectedLanguage = lang;
    this._translateService.use(lang.id);
  }

  public redirectToProfiles() {
    return this.router.navigate(["/profiles"]);
  }

  public selectProfile(id: string): void {
    this.profilesService.toggleSelected(id);
  }

  public ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }
}
