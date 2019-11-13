import {NgModule} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

const modules = [
  MatTableModule,
  MatMomentDateModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatCardModule,
  MatSnackBarModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialModule {}
