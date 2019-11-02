import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountsRoutingModule } from "./accounts-routing.module";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, AccountsRoutingModule]
})
export class AccountsModule {}
