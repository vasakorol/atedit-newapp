import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormType} from '../../profiles/profile';
import {Translations} from '../translation';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

interface InputData {
  action: FormType;
  translations?: Translations;
}
@Component({
  selector: 'atv-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TranslationFormComponent implements OnInit {
  public action: FormType;
  public form: FormGroup;
  public FormType = FormType;
  public uploadedFileContent: any;
  private readonly translations: Translations = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly translate: TranslateService,
    private readonly snackBar: MatSnackBar,
    private readonly _matDialog: MatDialog,
    public matDialogRef: MatDialogRef<TranslationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: InputData
  ) {
    this.action = _data.action;
    if (this.action === FormType.edit) {
      this.translations = _data.translations;
    }
  }

  ngOnInit() {
    this.init();
  }

  public onFileChanged(event) {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.uploadedFileContent = JSON.parse(fileReader.result as string);
      this.form.get('file').patchValue(fileName);
    };
  }

  private init(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      selected: new FormControl(false),
    });
    if (this.translations) {
      this.form.patchValue(this.translations);
    }
  }
}
