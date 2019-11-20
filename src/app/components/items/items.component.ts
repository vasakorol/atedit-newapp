import {Component} from '@angular/core';
import {FileItem} from '../../settings/file-manager/file-manager.interfaces';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FileManagerComponent} from '../../settings/file-manager/file-manager.component';

@Component({
  selector: 'atv-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  public selectedFile: FileItem = null;
  private fileManagerDialogRef: MatDialogRef<FileManagerComponent>;

  constructor(private readonly matDialog: MatDialog) {}

  public openFileManager() {
    this.fileManagerDialogRef = this.matDialog.open(FileManagerComponent, {
      panelClass: 'full-view-overlay'
    });
    this.fileManagerDialogRef.afterClosed().subscribe((response: FileItem) => {
      if (!response) {
        return;
      }
      this.selectedFile = response;
      this.fileManagerDialogRef = null;
    });
  }
}
