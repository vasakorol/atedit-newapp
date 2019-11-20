import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {ConfigRow} from 'app/models/configRow.interface';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {TabTypes} from 'app/models/tabTypes.enum';

@Component({
  selector: 'atv-table-config',
  templateUrl: './table-config.component.html',
  styleUrls: ['./table-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TableConfigComponent {
  @Output() newTableConfig = new EventEmitter<<T>(arg: T) => {[key in keyof T]: ConfigRow}>();

  private _tableConfig: <T>(arg: T) => {[key in keyof T]: ConfigRow} = null;

  get tableConfig(): <T>(arg: T) => {[key in keyof T]: ConfigRow} {
    return this._tableConfig;
  }

  @Input()
  set tableConfig(value: <T>(arg: T) => {[key in keyof T]: ConfigRow}) {
    this._tableConfig = value;
  }

  private _dataType: TabTypes = null;

  get dataType(): TabTypes {
    return this._dataType;
  }

  @Input()
  set dataType(value: TabTypes) {
    this._dataType = value;
  }

  constructor(private fuseSiderbarService: FuseSidebarService) {}

  get configKeys(): string[] {
    return Object.keys(this._tableConfig);
  }

  toggleSidebar(): void {
    this.fuseSiderbarService.getSidebar(this.dataType + '-table-config-sidebar').toggleOpen();
  }

  toggleColumnVisibility(event: MatCheckboxChange, key: string): void {
    this.tableConfig[key].visible = event.checked;
    this.newTableConfig.emit(this.tableConfig);
  }
}
