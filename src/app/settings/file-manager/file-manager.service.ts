import {Injectable} from '@angular/core';
import {ProfilesService} from '../profiles/profiles.service';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';
import {Profile} from '../profiles/profile';
import {FileItem, metaFileExtension} from './file-manager.interfaces';
import {StorageKeys, StorageService} from '../../services/storage.service';
import {LoadingService} from '../../components/loading/loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
declare var remote: any;

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private readonly fs: any = null;
  private readonly path: any = null;
  private destroyer = new Subject();
  private profile: Profile = null;

  private fileStream = new ReplaySubject<FileItem[]>(1);
  public files = this.fileStream.asObservable();

  constructor(
    private readonly profilesService: ProfilesService,
    private readonly loadingService: LoadingService,
    private readonly storageService: StorageService,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService
  ) {
    try {
      this.fs = remote.require('fs');
      this.path = remote.require('path');
    } catch (e) {
      this.fs = undefined;
      this.path = undefined;
    }

    this.profilesService.profiles.pipe(takeUntil(this.destroyer)).subscribe(profiles => {
      this.profile = profiles.find(profile => !profile.deleted && profile.selected);
    });

    const list = this.storageService.get<FileItem[]>(StorageKeys.storageMetaFilteredFilesKey);
    if (list) {
      this.fileStream.next(list);
    }
  }

  public async checkFolders() {
    if (this.fs && this.path && this.profile) {
      const list = await this.readFolder(this.profile.folder);
      this.fileStream.next(list);
      this.storageService.set<FileItem[]>(StorageKeys.storageMetaFilteredFilesKey, list);
    }
    this.loadingService.hide();
    this.snackBar.open(this.translate.instant('FILE_MANAGER.SYNC_COMPLETE'), this.translate.instant('ACTIONS.CLOSE'));
  }

  private async readFolder(folder: string): Promise<FileItem[]> {
    let result: FileItem[] = [];
    const list = this.fs.readdirSync(folder);
    for (let file of list) {
      const folderFile = this.path.resolve(folder, file);
      const fileStat = this.fs.statSync(folderFile);
      if (fileStat && fileStat.isDirectory()) {
        const files = await this.readFolder(folderFile);
        result = [...result, ...files];
      } else {
        if (this.checkFile(folderFile)) {
          const checkedFile = folderFile.replace(metaFileExtension, '');
          const extension = this.path.extname(checkedFile);
          let relativePath = checkedFile.replace(this.profile.folder, '');
          if (relativePath[0] === '/') {
            relativePath = relativePath.slice(1);
          }
          const item: FileItem = {
            path: checkedFile,
            relative_path: relativePath,
            title: this.path.basename(checkedFile, extension),
            name: this.path.basename(checkedFile),
            ext: extension.replace('.', '').toLowerCase()
          };
          result.push(item);
        }
      }
    }
    return result;
  }

  private checkFile(folderFile: string): boolean {
    if (this.path.extname(folderFile) !== metaFileExtension) {
      return false;
    }
    const fileContent = this.fs.readFileSync(folderFile, {encoding: 'utf-8'});
    return fileContent.toLowerCase().indexOf(this.profile.meta.toLowerCase()) !== -1;
  }
}
