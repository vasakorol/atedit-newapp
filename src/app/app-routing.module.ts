import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "instances",
    loadChildren: "./modules/instances/instances.module#InstancesModule"
  },
  {
    path: "accounts",
    loadChildren: "./modules/accounts/accounts.module#AccountsModule"
  },
  { path: "task", loadChildren: "./modules/task/task.module#TaskModule" },
  { path: "items", loadChildren: "./modules/items/items.module#ItemsModule" },
  {
    path: "currencies",
    loadChildren: "./modules/currencies/currencies.module#CurrenciesModule"
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
