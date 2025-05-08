import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WarehouseListComponent } from "./components/warehouse-list/warehouse-list.component";

const routes: Routes = [
  {
    path: "",
    component: WarehouseListComponent,
    data: {
      scrollDisable: true,
      toolbarShadowEnable:true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
