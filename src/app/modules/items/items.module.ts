import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ItemsRoutingModule } from "./items-routing.module";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, ItemsRoutingModule]
})
export class ItemsModule {}
