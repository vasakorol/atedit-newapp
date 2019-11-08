import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FuseModule } from "@fuse/fuse.module";

import { fuseConfig } from "./fuse-config";
import {
  FuseConfirmDialogModule,
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
import { ProfilesComponent } from "./settings/profiles/profiles.component";
import { ProfilesFormComponent } from "./settings/profiles/profiles-form/profiles-form.component";
import { MaterialModule } from "./material.module";
import { FuseConfirmDialogComponent } from "../@fuse/components/confirm-dialog/confirm-dialog.component";

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
    TaskComponent,
    ProfilesComponent,
    ProfilesFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    MaterialModule,
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    FuseConfirmDialogModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AccountsComponent,
    CurrenciesComponent,
    ItemsComponent,
    InstancesComponent,
    TaskComponent,
    ProfilesFormComponent
  ]
})
export class AppModule {}
