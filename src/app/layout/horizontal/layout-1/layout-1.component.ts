import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FuseConfigService } from "@fuse/services/config.service";
import { fuseConfig } from "../../../fuse-config";
import { FuseNavigationService } from "../../../../@fuse/components/navigation/navigation.service";

@Component({
  selector: "horizontal-layout-1",
  templateUrl: "./layout-1.component.html",
  styleUrls: ["./layout-1.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HorizontalLayout1Component implements OnInit, OnDestroy {
  public fuseConfig = fuseConfig;
  public navigation = this.fuseNavigationService.navigation;
  private _unsubscribeAll = new Subject();

  constructor(
    private _fuseConfigService: FuseConfigService,
    private fuseNavigationService: FuseNavigationService
  ) {}

  public ngOnInit(): void {
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.fuseConfig = config;
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
