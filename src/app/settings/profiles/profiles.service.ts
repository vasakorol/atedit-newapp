import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Profile } from "./profile.data";
import { StorageKeys, StorageService } from "../../services/storage.service";
import * as uuiv4 from "uuid/v4";

@Injectable({
  providedIn: "root"
})
export class ProfilesService {
  private readonly profilesStream = new ReplaySubject<Profile[]>(1);
  public profiles = this.profilesStream.asObservable();

  private list: Profile[] = [];

  constructor(private storageService: StorageService) {}

  public getProfiles() {
    const profiles = this.storageService.get<Profile[]>(
      StorageKeys.storageProfilesKey
    );
    if (profiles) {
      this.list = profiles.filter(profile => !profile.deleted);
    }
    this.profilesStream.next(this.list);
  }

  public toggleSelected(id: string) {
    const saved = this.list.find(item => item.id === id);
    if (saved) {
      this.list.forEach(item => (item.selected = false));
      this.list[this.list.indexOf(saved)].selected = true;
      this.updateProfiles();
    }
  }

  public updateProfile(id: string, profile: Profile) {
    const saved = this.list.find(item => item.id === id);
    profile.id = id;
    if (profile.selected) {
      this.list.forEach(item => (item.selected = false));
    }
    if (saved) {
      this.list[this.list.indexOf(saved)] = profile;
    } else {
      this.list.push(profile);
    }
    this.updateProfiles();
  }

  public newProfile(profile: Profile) {
    profile.id = uuiv4();
    profile.deleted = false;
    if (profile.selected) {
      this.list.forEach(item => (item.selected = false));
    }
    this.list.push(profile);
    this.updateProfiles();
  }

  public removeProfile(profile: Profile) {
    this.list[this.list.indexOf(profile)].deleted = true;
    this.updateProfiles();
  }

  private updateProfiles() {
    this.storageService.set(StorageKeys.storageProfilesKey, this.list);
    this.profilesStream.next(this.list);
  }
}
