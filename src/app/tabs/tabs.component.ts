import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Tab, TabsService } from "../services/tabs.service";

@Component({
  selector: "atv-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {
  private destroyer = new Subject();

  public tabs = this.tabsService.tabs.pipe(takeUntil(this.destroyer));
  public selectedTab = 0;

  constructor(private readonly tabsService: TabsService) {}

  public ngOnInit(): void {
    this.tabs.pipe(takeUntil(this.destroyer)).subscribe(tabs => {
      const tab = tabs.find(item => item.active);
      this.selectedTab = tab ? tabs.indexOf(tab) : 0;
    });
  }

  public removeTab(tab: Tab) {
    this.tabsService.removeTab(tab);
  }

  public ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }
}
