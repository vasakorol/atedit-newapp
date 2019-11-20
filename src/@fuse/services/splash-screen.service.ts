import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router';
import {filter, take} from 'rxjs/operators';
import {FileManagerService} from '../../app/settings/file-manager/file-manager.service';
import {AppConfig} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuseSplashScreenService {
  public splashScreenEl: any;
  public player: AnimationPlayer;

  constructor(
    private readonly animationBuilder: AnimationBuilder,
    private readonly fileManagerService: FileManagerService,
    private readonly router: Router,
    @Inject(DOCUMENT) private _document: any
  ) {
    this._init();
  }

  /**
   * Initialize
   */
  private _init(): void {
    this.splashScreenEl = this._document.body.querySelector('#fuse-splash-screen');
    if (this.splashScreenEl) {
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          take(1)
        )
        .subscribe(() => {
          setTimeout(() => {
            if (AppConfig.environment === 'PROD') {
              this.fileManagerService.checkFolders().then(() => {
                this.hide();
              });
            } else {
              this.hide();
            }
          });
        });
    }
  }

  /**
   * Show the splash screen
   */
  show(): void {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: '0',
          zIndex: '99999'
        }),
        animate('400ms ease', style({opacity: '1'}))
      ])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  /**
   * Hide the splash screen
   */
  hide(): void {
    this.player = this.animationBuilder
      .build([style({opacity: '1'}), animate('400ms ease', style({opacity: '0', zIndex: '-10'}))])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }
}
