import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProviderListComponent } from "./components/provider-list/provider-list.component";

//////***PROVIDER - PASO 7 */
//ENRUTARA EN EL DASBOARD, EL MUDULO DE LA LISTA DE PROVIDER
const routes: Routes = [
  {
    path: "",
    component: ProviderListComponent,
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
export class ProviderRoutingModule {}

//////SIGUE***PROVEEDOR - PASO 8 */
//CONFIGURAMOS LOS DATOS DE LA INTERFAS DE LA LISTA PROVEEDOR (pages/provider/provider/provider-lis-config)
