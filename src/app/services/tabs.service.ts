import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Tab, tabs } from "../tabs/tabs.data";

@Injectable({
  providedIn: "root"
})
export class TabsService {
  private tabsStream = new ReplaySubject<Tab[]>(1);
  private listTabs: Tab[] = [];
  public readonly tabs = this.tabsStream.asObservable();

  constructor() {}

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
  }

  public removeTab(tab: Tab) {
    if (this.listTabs.indexOf(tab) !== -1) {
      this.listTabs.splice(this.listTabs.indexOf(tab), 1);
      this.tabsStream.next(this.listTabs);
    }
  }

  public tabById(id: string): Tab {
    return tabs.find(tab => tab.id === id);
  }
}
