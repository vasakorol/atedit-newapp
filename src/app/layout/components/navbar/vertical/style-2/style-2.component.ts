import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {delay, filter, take, takeUntil} from 'rxjs/operators';
import {FuseConfigService} from '@fuse/services/config.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {fuseConfig} from '../../../../../fuse-config';

@Component({
  selector: 'navbar-vertical-style-2',
  templateUrl: './style-2.component.html',
  styleUrls: ['./style-2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle2Component implements OnInit, OnDestroy {
  public fuseConfig = fuseConfig;
  public navigation: any;

  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private destroyer = new Subject();

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _router: Router
  ) {}

  @ViewChild(FusePerfectScrollbarDirective, {static: true})
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }
    this._fusePerfectScrollbar = theDirective;
    this._fuseNavigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        takeUntil(this.destroyer)
      )
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => this._fusePerfectScrollbar.scrollToElement('navbar .nav-link.active', -120));
      });
  }

  public ngOnInit(): void {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroyer)
      )
      .subscribe(() => {
        if (this._fuseSidebarService.getSidebar('navbar')) {
          this._fuseSidebarService.getSidebar('navbar').close();
        }
      });
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this.destroyer)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });
    this._fuseConfigService.config.pipe(takeUntil(this.destroyer)).subscribe(config => {
      this.fuseConfig = config;
    });
  }

  public ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }

  public toggleSidebarOpened(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  public toggleSidebarFolded(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleFold();
  }
}
