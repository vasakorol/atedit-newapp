import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import {ConfigRow, ConfigTypes} from 'app/models/configRow.interface';
import * as moment from 'moment';
import {StorageService} from 'app/services/storage.service';
import {TabTypes} from 'app/models/tabTypes.enum';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'atv-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  public isDate = ConfigTypes.date;
  public isDropdown = ConfigTypes.dropdown;
  public dataSource: MatTableDataSource<<T>(arg: T) => T[]>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private _displayedColumns: string[] = [];

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  private _tableConfig: <T>(arg: T) => {[key in keyof T]: ConfigRow} = null;

  get tableConfig(): <T>(arg: T) => {[key in keyof T]: ConfigRow} {
    return this._tableConfig;
  }

  @Input()
  set tableConfig(value: <T>(arg: T) => {[key in keyof T]: ConfigRow}) {
    this._tableConfig = value;
    this._displayedColumns = this.filterVisibleColumns(value);
  }

  private _tableData: <T>(arg: T) => T[] = null;

  get tableData(): <T>(arg: T) => T[] {
    return this._tableData;
  }

  @Input()
  set tableData(value: <T>(arg: T) => T[]) {
    this._tableData = value;
    this.initTableDataSource(this.tableData);
  }

  private _dataType: TabTypes = null;

  get dataType(): TabTypes {
    return this._dataType;
  }

  @Input()
  set dataType(value: TabTypes) {
    this._dataType = value;
  }

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    const lsData: string = this.storageService.get(this._dataType + '-storage');
    if (lsData) {
      this.tableConfig = JSON.parse(lsData);
    }
  }

  public parseDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  public updateTable(evt): void {
    this.tableConfig = evt;
    const storageData = JSON.stringify(this.tableConfig);
    this.storageService.set(this._dataType + '-storage', storageData);
  }

  public getTranslation(columnName: string) {
    return `${this.dataType.toUpperCase()}.${columnName.toUpperCase()}`;
  }

  public initTableDataSource(data): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  private filterVisibleColumns(columns): string[] {
    return Object.keys(columns).filter(
      key => columns[key].visible && columns[key].filterVisible
    );
  }
}
