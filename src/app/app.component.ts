import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseSplashScreenService} from '@fuse/services/splash-screen.service';
import {TranslationService} from './settings/translation/translation.service';
import {FuseConfig} from '../@fuse/types';
import {fuseConfig} from './fuse-config';

@Component({
  selector: 'atv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public fuseConfig: FuseConfig = fuseConfig;
  private destroyer = new Subject();

  constructor(
    @Inject(DOCUMENT) private document: any,
    private readonly _fuseConfigService: FuseConfigService,
    private readonly _fuseSidebarService: FuseSidebarService,
    private readonly _fuseSplashScreenService: FuseSplashScreenService,
    private readonly _translateService: TranslateService,
    private readonly _platform: Platform,
    private readonly translationService: TranslationService
  ) {
    this.translationService.translationLoading();
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
  }

  public ngOnInit(): void {
    this._fuseConfigService.config.pipe(takeUntil(this.destroyer)).subscribe(config => {
      this.fuseConfig = config;
      if (this.fuseConfig.layout.width === 'boxed') {
        this.document.body.classList.add('boxed');
      } else {
        this.document.body.classList.remove('boxed');
      }
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
    this.destroyer.next();
    this.destroyer.complete();
  }

  public toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
