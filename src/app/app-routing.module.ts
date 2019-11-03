import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TabsComponent } from "./tabs/tabs.component";

const routes: Routes = [
  { path: "", component: TabsComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
