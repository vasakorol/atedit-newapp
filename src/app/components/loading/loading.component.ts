import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'atv-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {
  public loading: boolean = false;

  constructor(private readonly loadingService: LoadingService, private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.loadingService.loading.subscribe(loading => {
      this.loading = loading;
      this.changeDetectorRef.markForCheck();
    });
  }
}
