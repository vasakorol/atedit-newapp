import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { Tab } from "../../services/tabs.service";
import { TabDirective } from "./tab.directive";

@Component({
  selector: "atv-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements OnInit {
  @Input() tab: Tab;

  @ViewChild(TabDirective, { static: true }) tabHost: TabDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    if (this.tab) {
      this.loadTab();
    }
  }

  public loadTab() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.tab.component
    );
    const viewContainerRef = this.tabHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
}
