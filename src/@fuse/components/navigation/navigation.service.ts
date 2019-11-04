import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  ObservedValuesFromArray,
  ReplaySubject,
  Subject
} from "rxjs";

import { FuseNavigation, FuseNavigationItem } from "@fuse/types";
import { tabs, TabType, TabTypeIcon } from "../../../app/tabs/tabs.data";

@Injectable({
  providedIn: "root"
})
export class FuseNavigationService {
  public onItemCollapsed = new Subject<FuseNavigation>();
  public onItemCollapseToggled = new Subject<any>();

  private _onNavigationChanged = new BehaviorSubject(null);
  private _onNavigationItemAdded = new BehaviorSubject(null);
  private _onNavigationItemUpdated = new BehaviorSubject(null);
  private _onNavigationItemRemoved = new BehaviorSubject(null);

  private _currentNavigationKey: string = null;
  private _registry: { [key: string]: any } = {};

  private navigationStream = new ReplaySubject<FuseNavigation[]>(1);
  public navigation = this.navigationStream.asObservable();

  constructor() {
    this.buildNavigation();
  }

  private buildNavigation(): void {
    const navigation: FuseNavigation[] = [];
    Object.keys(TabType).forEach(item => {
      const children = tabs.filter(nav => nav.type === item);
      const navigationParent: FuseNavigation = {
        id: item,
        title: "NAV.SECTION." + item.toLocaleUpperCase(),
        type: "collapsable",
        icon: TabTypeIcon[item],
        children: children.map(nav => {
          return {
            id: nav.id,
            title: nav.title,
            type: "item",
            icon: nav.icon,
            component: nav.component
          };
        })
      };
      if (navigationParent.children.length > 0) {
        navigation.push(navigationParent);
      }
    });
    console.log("navigation", navigation);
    this.navigationStream.next(navigation);
  }

  /**
   * Get onNavigationChanged
   *
   * @returns {Observable<any>}
   */
  get onNavigationChanged(): Observable<any> {
    return this._onNavigationChanged.asObservable();
  }

  /**
   * Get onNavigationItemAdded
   *
   * @returns {Observable<any>}
   */
  get onNavigationItemAdded(): Observable<any> {
    return this._onNavigationItemAdded.asObservable();
  }

  /**
   * Get onNavigationItemUpdated
   *
   * @returns {Observable<any>}
   */
  get onNavigationItemUpdated(): Observable<any> {
    return this._onNavigationItemUpdated.asObservable();
  }

  /**
   * Get onNavigationItemRemoved
   *
   * @returns {Observable<any>}
   */
  get onNavigationItemRemoved(): Observable<any> {
    return this._onNavigationItemRemoved.asObservable();
  }

  /**
   * Get navigation from registry by key
   *
   * @param key
   * @returns {any}
   */
  getNavigation(key): any {
    // Check if the navigation exists
    if (!this._registry[key]) {
      console.warn(
        `The navigation with the key '${key}' doesn't exist in the registry.`
      );

      return;
    }

    // Return the sidebar
    return this._registry[key];
  }

  /**
   * Get flattened navigation array
   *
   * @param navigation
   * @param flatNavigation
   * @returns {any[]}
   */
  getFlatNavigation(
    navigation,
    flatNavigation: FuseNavigationItem[] = []
  ): any {
    for (const item of navigation) {
      if (item.type === "item") {
        flatNavigation.push(item);

        continue;
      }

      if (item.type === "collapsable" || item.type === "group") {
        if (item.children) {
          this.getFlatNavigation(item.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  /**
   * Get the current navigation
   *
   * @returns {any}
   */
  getCurrentNavigation(): any {
    if (!this._currentNavigationKey) {
      console.warn(`The current navigation is not set.`);

      return;
    }

    return this.getNavigation(this._currentNavigationKey);
  }

  /**
   * Get navigation item by id from the
   * current navigation
   *
   * @param id
   * @param {any} navigation
   * @returns {any | boolean}
   */
  getNavigationItem(id, navigation = null): any | boolean {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
    }

    for (const item of navigation) {
      if (item.id === id) {
        return item;
      }

      if (item.children) {
        const childItem = this.getNavigationItem(id, item.children);

        if (childItem) {
          return childItem;
        }
      }
    }

    return false;
  }

  /**
   * Get the parent of the navigation item
   * with the id
   *
   * @param id
   * @param {any} navigation
   * @param parent
   */
  getNavigationItemParent(id, navigation = null, parent = null): any {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
      parent = navigation;
    }

    for (const item of navigation) {
      if (item.id === id) {
        return parent;
      }

      if (item.children) {
        const childItem = this.getNavigationItemParent(id, item.children, item);

        if (childItem) {
          return childItem;
        }
      }
    }

    return false;
  }

  /**
   * Add a navigation item to the specified location
   *
   * @param item
   * @param id
   */
  addNavigationItem(item, id): void {
    // Get the current navigation
    const navigation = this.getCurrentNavigation();

    // Add to the end of the navigation
    if (id === "end") {
      navigation.push(item);

      // Trigger the observable
      this._onNavigationItemAdded.next(true);

      return;
    }

    // Add to the start of the navigation
    if (id === "start") {
      navigation.unshift(item);

      // Trigger the observable
      this._onNavigationItemAdded.next(true);

      return;
    }

    // Add it to a specific location
    const parent: any = this.getNavigationItem(id);

    if (parent) {
      // Check if parent has a children entry,
      // and add it if it doesn't
      if (!parent.children) {
        parent.children = [];
      }

      // Add the item
      parent.children.push(item);
    }

    // Trigger the observable
    this._onNavigationItemAdded.next(true);
  }

  /**
   * Remove navigation item with the given id
   *
   * @param id
   */
  removeNavigationItem(id): void {
    const item = this.getNavigationItem(id);

    // Return, if there is not such an item
    if (!item) {
      return;
    }

    // Get the parent of the item
    let parent = this.getNavigationItemParent(id);

    // This check is required because of the first level
    // of the navigation, since the first level is not
    // inside the 'children' array
    parent = parent.children || parent;

    // Remove the item
    parent.splice(parent.indexOf(item), 1);

    // Trigger the observable
    this._onNavigationItemRemoved.next(true);
  }
}
