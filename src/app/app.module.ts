import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FuseModule } from "@fuse/fuse.module";
import "hammerjs";

import { TranslateModule } from "@ngx-translate/core";
import { fuseConfig } from "./fuse-config";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule
} from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";
import { LayoutModule } from "./layout/layout.module";
import { TabsComponent } from "./tabs/tabs.component";
import { TabComponent } from "./tabs/tab/tab.component";
import { TabDirective } from "./tabs/tab/tab.directive";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { CurrenciesComponent } from "./components/currencies/currencies.component";
import { ItemsComponent } from "./components/items/items.component";
import { InstancesComponent } from "./components/instances/instances.component";
import { TaskComponent } from "./components/task/task.component";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    TabDirective,
    AccountsComponent,
    CurrenciesComponent,
    ItemsComponent,
    InstancesComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),

    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,

    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AccountsComponent,
    CurrenciesComponent,
    ItemsComponent,
    InstancesComponent,
    TaskComponent
  ]
})
export class AppModule {}
