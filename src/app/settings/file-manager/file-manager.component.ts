import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FileManagerService} from './file-manager.service';
import {combineLatest, Subject} from 'rxjs';
import {distinctUntilChanged, startWith, takeUntil, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {FileExtension, FileItem} from './file-manager.interfaces';
import {fuseAnimations} from '@fuse/animations';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoadingService} from '../../components/loading/loading.service';

@Component({
  selector: 'atv-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class FileManagerComponent implements OnInit, OnDestroy {
  private destroyer = new Subject();
  public loading: boolean = true;
  public searchInput = new FormControl('');
  public files: FileItem[] = [];
  public FileExtension = FileExtension;
  public selectedFile: FileItem = null;

  constructor(
    private readonly fileManagerService: FileManagerService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    public matDialogRef: MatDialogRef<FileManagerComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    combineLatest(
      this.fileManagerService.files,
      this.searchInput.valueChanges.pipe(
        startWith(''),
        tap(() => (this.loading = true)),
        distinctUntilChanged()
      )
    )
      .pipe(takeUntil(this.destroyer))
      .subscribe(([files, query]: [FileItem[], string]) => {
        if (query) {
          files = files.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
        }
        this.files = files;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnInit() {}

  public selectFile(file: FileItem) {
    if (this.selectedFile && this.selectedFile.path === file.path) {
      this.selectedFile = null;
    } else {
      this.selectedFile = file;
    }
    this.changeDetectorRef.markForCheck();
  }

  public synchronizeFiles() {
    this.loadingService.show();
    this.changeDetectorRef.markForCheck();
    setTimeout(() => this.fileManagerService.checkFolders());
  }

  public trackByFn(_, file: FileItem) {
    return file.path;
  }

  public ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }
}
