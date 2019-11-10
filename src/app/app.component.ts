import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseSplashScreenService} from '@fuse/services/splash-screen.service';
import {fuseConfig} from './fuse-config';
import {TranslationService} from './settings/translation/translation.service';

@Component({
  selector: 'atv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public fuseConfig = fuseConfig;
  private _unsubscribeAll = new Subject();

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _translateService: TranslateService,
    private _platform: Platform,
    private readonly translationService: TranslationService
  ) {
    this.translationService.translationLoading();

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
  }

  public ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (let i = 0; i < this.document.body.classList.length; i++) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.fuseConfig.colorTheme);
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  public toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
