import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FuseModule} from '@fuse/fuse.module';

import {TranslateModule} from '@ngx-translate/core';
import {fuseConfig} from './fuse-config';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {
  FuseConfirmDialogModule,
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule
} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {LayoutModule} from './layout/layout.module';
import {TabsComponent} from './tabs/tabs.component';
import {TabComponent} from './tabs/tab/tab.component';
import {TabDirective} from './tabs/tab/tab.directive';
import {AccountsComponent} from './components/accounts/accounts.component';
import {CurrenciesComponent} from './components/currencies/currencies.component';
import {ItemsComponent} from './components/items/items.component';
import {InstancesComponent} from './components/instances/instances.component';
import {TaskComponent} from './components/task/task.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TableComponent} from './components/table/table.component';
import {TableConfigComponent} from './components/table/table-config/table-config.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

import {ProfilesComponent} from './settings/profiles/profiles.component';
import {ProfilesFormComponent} from './settings/profiles/profiles-form/profiles-form.component';
import {MaterialModule} from './material.module';
import {TranslationComponent} from './settings/translation/translation.component';
import {TranslationFormComponent} from './settings/translation/translation-form/translation-form.component';
import {FileManagerComponent} from './settings/file-manager/file-manager.component';
import {LoadingComponent} from './components/loading/loading.component';

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
    TableComponent,
    TableConfigComponent,
    ProfilesComponent,
    ProfilesFormComponent,
    TranslationComponent,
    TranslationFormComponent,
    FileManagerComponent,
    LoadingComponent
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
    MatTableModule,
    MatRadioModule,
    MatSelectModule,

    MaterialModule,
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    MatCheckboxModule,
    LayoutModule,
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
    ProfilesFormComponent,
    TranslationFormComponent,
    FileManagerComponent
  ]
})
export class AppModule {}
