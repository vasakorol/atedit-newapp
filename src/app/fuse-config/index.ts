import { FuseConfig } from "@fuse/types";
import { FuseNavigation } from "@fuse/types";

export const fuseConfig: FuseConfig = {
  // Color themes can be defined in src/app/app.theme.scss
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
        url: "/instances"
      },
      {
        id: "accounts",
        title: "Accounts",
        translate: "NAV.ACCOUNTS",
        type: "item",
        icon: "account_circle",
        url: "/accounts"
      },
      {
        id: "task",
        title: "Task",
        translate: "NAV.TASK",
        type: "item",
        icon: "storage",
        url: "/task"
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
        url: "/items"
      },
      {
        id: "currencies",
        title: "Currencies",
        translate: "NAV.CURRENCIES",
        type: "item",
        icon: "attach_money",
        url: "/currencies"
      }
    ]
  }
];
