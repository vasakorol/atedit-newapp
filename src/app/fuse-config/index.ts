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
    id: "applications",
    title: "Applications",
    translate: "NAV.APPLICATIONS",
    type: "group",
    children: [
      {
        id: "sample",
        title: "Sample",
        translate: "NAV.SAMPLE.TITLE",
        type: "item",
        icon: "email",
        url: "/sample",
        badge: {
          title: "25",
          translate: "NAV.SAMPLE.BADGE",
          bg: "#F44336",
          fg: "#FFFFFF"
        }
      }
    ]
  }
];
