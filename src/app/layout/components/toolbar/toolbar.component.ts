import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {Router} from '@angular/router';
import {ProfilesService} from '../../../settings/profiles/profiles.service';
import {Profile} from '../../../settings/profiles/profile';
import {TranslationService} from '../../../settings/translation/translation.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public horizontalNavbar: boolean;
  public rightNavbar: boolean;
  public hiddenNavbar: boolean;
  public profile: Profile = null;
  public profiles: Profile[] = [];
  private destroyer = new Subject();
  public translations = this.translationService.translations.pipe(
    map(translations => translations.filter(translation => !translation.selected)),
    takeUntil(this.destroyer)
  );
  public selectedTranslation = this.translationService.translation.pipe(takeUntil(this.destroyer));
  public version: string;
  private _ipc;

  constructor(
    private readonly router: Router,
    private readonly profilesService: ProfilesService,
    private readonly _fuseConfigService: FuseConfigService,
    private readonly _fuseSidebarService: FuseSidebarService,
    private readonly translationService: TranslationService
  ) {}

  public ngOnInit(): void {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
        this.appVersion();
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("Electron's IPC was not loaded");
    }
    this._fuseConfigService.config.pipe(takeUntil(this.destroyer)).subscribe(settings => {
      this.horizontalNavbar = settings.layout.navbar.position === 'top';
      this.rightNavbar = settings.layout.navbar.position === 'right';
      this.hiddenNavbar = settings.layout.navbar.hidden === true;
    });

    this.profilesService.getProfiles();
    this.profilesService.profiles.pipe(takeUntil(this.destroyer)).subscribe(profiles => {
      this.profiles = profiles.filter(profile => !profile.deleted && !profile.selected);
      this.profile = profiles.find(profile => !profile.deleted && profile.selected);
    });
  }

  public toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  public changeTranslation(id: string): void {
    this.translationService.selected(id);
  }

  public redirectToProfiles() {
    return this.router.navigate(['/profiles']);
  }

  public redirectToTranslations() {
    return this.router.navigate(['/translation']);
  }

  public selectProfile(id: string): void {
    this.profilesService.toggleSelected(id);
  }

  public ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }

  private appVersion() {
    this._ipc.send('app_version');
    this._ipc.on('app_version', (_, arg) => {
      this.version = arg.version;
      this._ipc.removeAllListeners('app_version');
    });
  }
}
