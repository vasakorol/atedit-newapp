import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { merge, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";

@Component({
  selector: "fuse-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit {
  @Input()
  layout = "vertical";

  @Input()
  navigation: any;

  private _unsubscribeAll = new Subject();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseNavigationService: FuseNavigationService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    this.navigation =
      this.navigation || this._fuseNavigationService.getCurrentNavigation();

    this._fuseNavigationService.onNavigationChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to navigation item
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
}
