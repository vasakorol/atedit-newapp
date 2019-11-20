import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {dataBase, FormType, Profile} from '../profile';
import {TranslateService} from '@ngx-translate/core';
import {DatabaseService} from '../../../services/database.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
declare var remote: any;

interface InputData {
  action: FormType;
  profile?: Profile;
}

@Component({
  selector: 'atv-profiles-form',
  templateUrl: './profiles-form.component.html',
  styleUrls: ['./profiles-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilesFormComponent implements OnInit {
  public action: FormType;
  public form: FormGroup;
  public FormType = FormType;
  public dataBase = dataBase;
  private readonly _profile: Profile = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly translate: TranslateService,
    private readonly databaseService: DatabaseService,
    private readonly snackBar: MatSnackBar,
    private readonly _matDialog: MatDialog,
    public matDialogRef: MatDialogRef<ProfilesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: InputData
  ) {
    this.action = _data.action;
    if (this.action === FormType.edit) {
      this._profile = _data.profile;
    }
  }

  ngOnInit() {
    this.init();
  }

  public testConnection(item: FormGroup): void {
    let error = false;
    if (!item.get('host').value) {
      item.get('host').markAsTouched();
      error = true;
    }
    if (!item.get('database').value) {
      item.get('database').markAsTouched();
      error = true;
    }
    if (!item.get('user').value) {
      item.get('user').markAsTouched();
      error = true;
    }
    if (!item.get('password').value) {
      item.get('password').markAsTouched();
      error = true;
    }
    if (error) {
      return;
    }
    this.databaseService.testConnection(item.getRawValue()).then(result => {
      if (!result.status) {
        this.snackBar.open(
          this.translate.instant('DATABASE.CONNECTION.ERROR') + ': ' + result.message,
          this.translate.instant('ACTIONS.CLOSE')
        );
      } else {
        this.snackBar.open(
          this.translate.instant('DATABASE.CONNECTION.SUCCESS'),
          this.translate.instant('ACTIONS.CLOSE')
        );
      }
    });
  }

  public chooseFolder() {
    remote.dialog
      .showOpenDialog({
        title: this.translate.instant('PROFILES.CHOOSE_FOLDER_TITLE'),
        properties: ['openDirectory']
      })
      .then(result => {
        if (!result.canceled) {
          this.form.get('folder').patchValue(result.filePaths[0]);
        }
      });
  }

  private init(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      folder: new FormControl('', [Validators.required]),
      meta: new FormControl('', [Validators.required]),
      selected: new FormControl(false),
      databases: this.fb.array([
        this.createSubDatabase('admin'),
        this.createSubDatabase('atavism'),
        this.createSubDatabase('master'),
        this.createSubDatabase('worldContent')
      ])
    });
    if (this._profile) {
      this.form.patchValue(this._profile);
    }
  }

  private createSubDatabase(type): FormGroup {
    return this.fb.group({
      type: new FormControl(type),
      host: new FormControl('', [Validators.required]),
      port: new FormControl(''),
      database: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
}
