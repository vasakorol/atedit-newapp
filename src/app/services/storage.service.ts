import { Injectable } from "@angular/core";
declare var remote: any;

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private store: any;
  private usingLocal: boolean = false;

  /**
   * Storage for electron production not work for localhost,
   * so we have two different storage handling
   */
  constructor() {
    try {
      const Store = remote.require("electron-store");
      this.store = new Store();
      this.usingLocal = false;
    } catch (e) {
      this.store = localStorage;
      this.usingLocal = true;
    }
  }

  public set<T>(key: string, value: T): void {
    if (this.usingLocal) {
      this.store.setItem(key, JSON.stringify(value));
    } else {
      this.store.set(key, value);
    }
  }

  public get<T>(key: string): T {
    if (this.usingLocal) {
      return JSON.parse(this.store.getItem(key));
    } else {
      return this.store.get(key);
    }
  }

  public remove(key: string): void {
    if (this.usingLocal) {
      this.store.removeItem(key);
    } else {
      this.store.delete(key);
    }
  }
}
