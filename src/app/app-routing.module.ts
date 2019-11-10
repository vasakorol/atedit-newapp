import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsComponent} from './tabs/tabs.component';
import {ProfilesComponent} from './settings/profiles/profiles.component';
import {ProfileGuard} from './settings/profiles/profile.guard';
import {TranslationComponent} from './settings/translation/translation.component';

const routes: Routes = [
  {path: '', component: TabsComponent, canActivate: [ProfileGuard]},
  {path: 'profiles', component: ProfilesComponent},
  {path: 'translation', component: TranslationComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
