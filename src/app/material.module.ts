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
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
} from '@angular/material';

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
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatPaginatorModule
];

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class MaterialModule {}
