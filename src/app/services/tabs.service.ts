import {StorageKeys, StorageService} from './storage.service';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {Tab, tabs} from '../tabs/tabs.data';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private tabsStream = new ReplaySubject<Tab[]>(1);
  private listTabs: Tab[] = [];
  public readonly tabs = this.tabsStream.asObservable();

  constructor(private storageService: StorageService) {
    this.init();
  }

  private init() {
    const savedTabs = this.storageService.get<Tab[]>(
      StorageKeys.storageTabsKey
    );
    if (savedTabs) {
      this.listTabs = [];
      savedTabs.forEach(item => {
        const tab = tabs.find(tab => tab.id === item.id);
        if (tab) {
          tab.active = item.active;
          this.listTabs.push(tab);
        }
      });
      this.tabsStream.next(this.listTabs);
    }
  }

  /**
   * While adding new tab to list of tabs, we need to check if this tab is already added,
   * Also need to mark all other tabs as not active
   *
   * Additionally saving tabs into storage, to open after reload
   *
   * @param tab
   */
  public addTab(tab: Tab) {
    const itemTab = this.listTabs.find(item => item.id === tab.id);
    this.listTabs.forEach(item => (item.active = false));
    if (!itemTab) {
      this.listTabs.push(tab);
    } else {
      this.listTabs.forEach(item => (item.active = item.id === itemTab.id));
    }
    this.tabsStream.next(this.listTabs);
    this.saveToStorage();
  }

  public removeTab(tab: Tab) {
    if (this.listTabs.indexOf(tab) !== -1) {
      this.listTabs.splice(this.listTabs.indexOf(tab), 1);
      this.tabsStream.next(this.listTabs);
      this.saveToStorage();
    }
  }

  public tabById(id: string): Tab {
    return tabs.find(tab => tab.id === id);
  }

  public updateSelectedTab(index: number) {
    this.listTabs.forEach(item => (item.active = false));
    this.listTabs[index] ? (this.listTabs[index].active = true) : null;
    this.saveToStorage();
  }

  private saveToStorage() {
    this.storageService.set(
      StorageKeys.storageTabsKey,
      this.listTabs.map(tab => ({id: tab.id, active: tab.active}))
    );
  }
}
