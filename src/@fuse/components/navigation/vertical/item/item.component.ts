import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Type,
} from '@angular/core';
import {merge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseNavigationItem} from '@fuse/types';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {TabsService} from '../../../../../app/services/tabs.service';
import {FuseSidebarService} from '../../../sidebar/sidebar.service';
import {Tab} from '../../../../../app/tabs/tabs.data';
import {Router} from '@angular/router';

@Component({
  selector: 'fuse-nav-vertical-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class FuseNavVerticalItemComponent implements OnInit, OnDestroy {
  @HostBinding('class') public classes = 'nav-item';

  @Input() public item: FuseNavigationItem;

  private _unsubscribeAll = new Subject();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseNavigationService: FuseNavigationService,
    private readonly _fuseSidebarService: FuseSidebarService,
    private readonly tabsService: TabsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    merge(
      this._fuseNavigationService.onNavigationItemAdded,
      this._fuseNavigationService.onNavigationItemUpdated,
      this._fuseNavigationService.onNavigationItemRemoved
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public openComponent(item: FuseNavigationItem) {
    if (this.router.url !== '/') {
      this.router.navigate(['']);
    }
    const selectedTab = this.tabsService.tabById(item.id);
    const tab: Tab = {
      id: item.id,
      icon: item.icon,
      title: item.title,
      type: selectedTab.type,
      active: true,
      component: selectedTab.component,
    };
    this.tabsService.addTab(tab);
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }
}
