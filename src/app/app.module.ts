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
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),

    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,

    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
