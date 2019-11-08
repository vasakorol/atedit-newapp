import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ProfilesService } from "./profiles.service";
import { combineLatest, Observable, Subject } from "rxjs";
import { FormType, Profile } from "./profile.data";
import {
  distinctUntilChanged,
  first,
  startWith,
  takeUntil
} from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { ProfilesFormComponent } from "./profiles-form/profiles-form.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { FuseConfirmDialogComponent } from "../../../@fuse/components/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "atv-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfilesComponent implements OnInit, OnDestroy {
  private destroyer = new Subject();

  public profiles = new MatTableDataSource<Profile>([]);
  public displayedColumns = [
    "name",
    "databases",
    "game_folder",
    "selected",
    "actions"
  ];
  public searchInput = new FormControl("");

  private dialogRef: MatDialogRef<ProfilesFormComponent>;
  private confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private readonly profilesService: ProfilesService,
    private readonly _matDialog: MatDialog,
    private readonly translateService: TranslateService
  ) {
    combineLatest(
      this.profilesService.profiles,
      this.searchInput.valueChanges.pipe(
        startWith(""),
        distinctUntilChanged()
      )
    )
      .pipe(takeUntil(this.destroyer))
      .subscribe(([profiles, query]: [Profile[], string]) => {
        let list: Profile[] = profiles.filter(profile => !profile.deleted);
        if (query) {
          list = list.filter(profile =>
            profile.name.toLowerCase().includes(query.toLowerCase())
          );
        }
        this.profiles = new MatTableDataSource<Profile>(list);
      });
  }

  ngOnInit() {
    this.profilesService.getProfiles();
  }

  public toggleSelected(id: string): void {
    this.profilesService.toggleSelected(id);
  }

  public removeProfile(profile: Profile): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      panelClass: "confirm-dialog",
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmTitle = this.translateService.instant(
      "CONFIRM.REMOVE_TITLE"
    );
    this.confirmDialogRef.componentInstance.confirmMessage = this.translateService.instant(
      "CONFIRM.REMOVE"
    );
    this.confirmDialogRef.componentInstance.confirmAcceptButton = this.translateService.instant(
      "ACTIONS.CONFIRM"
    );
    this.confirmDialogRef.componentInstance.confirmCancelButton = this.translateService.instant(
      "ACTIONS.CANCEL"
    );
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profilesService.removeProfile(profile);
      }
      this.confirmDialogRef = null;
    });
  }

  public editProfile(profile: Profile): void {
    this.dialogRef = this._matDialog.open(ProfilesFormComponent, {
      panelClass: "profile-form-dialog",
      data: {
        profile,
        action: FormType.edit
      }
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
        return;
      }
      this.profilesService.updateProfile(profile.id, response.getRawValue());
      this.dialogRef = null;
    });
  }

  public addProfile(): void {
    this.dialogRef = this._matDialog.open(ProfilesFormComponent, {
      panelClass: "profile-form-dialog",
      data: {
        action: FormType.new
      }
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
        return;
      }
      this.profilesService.newProfile(response.getRawValue());
      this.dialogRef = null;
    });
  }

  public ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }
}
