import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TaskRoutingModule } from "./task-routing.module";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, TaskRoutingModule]
})
export class TaskModule {}
