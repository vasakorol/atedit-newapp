import { FuseConfig } from "@fuse/types";
import { FuseNavigation } from "@fuse/types";
import { InstancesComponent } from "../components/instances/instances.component";
import { AccountsComponent } from "../components/accounts/accounts.component";
import { ItemsComponent } from "../components/items/items.component";
import { TaskComponent } from "../components/task/task.component";
import { CurrenciesComponent } from "../components/currencies/currencies.component";

export const fuseConfig: FuseConfig = {
  colorTheme: "theme-default",
  customScrollbars: true,
  layout: {
    style: "vertical-layout-1",
    width: "fullwidth",
    navbar: {
      primaryBackground: "fuse-navy-700",
      secondaryBackground: "fuse-navy-900",
      folded: false,
      hidden: false,
      position: "left",
      variant: "vertical-style-1"
    },
    toolbar: {
      customBackgroundColor: false,
      background: "fuse-white-500",
      hidden: false,
      position: "below-static"
    },
    footer: {
      hidden: true,
      customBackgroundColor: true,
      background: "fuse-navy-900",
      position: "below-fixed"
    },
    sidepanel: {
      hidden: false,
      position: "right"
    }
  }
};

export const navigation: FuseNavigation[] = [
  {
    id: "server",
    title: "Server",
    translate: "NAV.SERVER",
    type: "collapsable",
    children: [
      {
        id: "instances",
        title: "Instances",
        translate: "NAV.INSTANCES",
        type: "item",
        icon: "storage",
        component: InstancesComponent
      },
      {
        id: "accounts",
        title: "Accounts",
        translate: "NAV.ACCOUNTS",
        type: "item",
        icon: "account_circle",
        component: AccountsComponent
      },
      {
        id: "task",
        title: "Task",
        translate: "NAV.TASK",
        type: "item",
        icon: "storage",
        component: TaskComponent
      }
    ]
  },
  {
    id: "item",
    title: "Item",
    translate: "NAV.ITEM",
    type: "collapsable",
    children: [
      {
        id: "items",
        title: "Items",
        translate: "NAV.ITEMS",
        type: "item",
        icon: "storage",
        component: ItemsComponent
      },
      {
        id: "currencies",
        title: "Currencies",
        translate: "NAV.CURRENCIES",
        type: "item",
        icon: "attach_money",
        component: CurrenciesComponent
      }
    ]
  }
];
