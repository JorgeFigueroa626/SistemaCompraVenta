import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientListComponent } from "./components/client-list/client-list.component";

const routes: Routes = [
  {
    path: "",
    component: ClientListComponent,
    data: {
      scrollDisable: true,
      toolbarShadowEnable: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
