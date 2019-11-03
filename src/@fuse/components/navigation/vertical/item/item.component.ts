import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Type
} from "@angular/core";
import { merge, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { FuseNavigationItem } from "@fuse/types";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { Tab, TabsService } from "../../../../../app/services/tabs.service";
import { FuseSidebarService } from "../../../sidebar/sidebar.service";

@Component({
  selector: "fuse-nav-vertical-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class FuseNavVerticalItemComponent implements OnInit, OnDestroy {
  @HostBinding("class")
  classes = "nav-item";

  @Input()
  item: FuseNavigationItem;

  private _unsubscribeAll = new Subject();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseNavigationService: FuseNavigationService,
    private readonly _fuseSidebarService: FuseSidebarService,
    private readonly tabsService: TabsService
  ) {}

  ngOnInit(): void {
    merge(
      this._fuseNavigationService.onNavigationItemAdded,
      this._fuseNavigationService.onNavigationItemUpdated,
      this._fuseNavigationService.onNavigationItemRemoved
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public openComponent(title: string, component: Type<any>) {
    const tab: Tab = {
      id: title.toLowerCase().replace(".", "_"),
      title,
      active: true,
      component
    };
    this.tabsService.addTab(tab);
    this._fuseSidebarService.getSidebar("navbar").toggleOpen();
  }
}
