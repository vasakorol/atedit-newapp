import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import * as _ from "lodash";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { navigation } from "../../../fuse-config";

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
  public horizontalNavbar: boolean;
  public rightNavbar: boolean;
  public hiddenNavbar: boolean;
  public languages: Language[];
  public navigation = navigation;
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

  private _unsubscribeAll = new Subject();

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService
  ) {
    // TODO dynamic languages
    this.languages = [{ id: "en", title: "English", flag: "us" }];
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(settings => {
        this.horizontalNavbar = settings.layout.navbar.position === "top";
        this.rightNavbar = settings.layout.navbar.position === "right";
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this.selectedLanguage = this.languages.find(
      language => language.id === this._translateService.currentLang
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    console.log(value);
  }

  /**
   * Set the language
   *
   * @param lang
   */
  setLanguage(lang): void {
    this.selectedLanguage = lang;
    this._translateService.use(lang.id);
  }
}
