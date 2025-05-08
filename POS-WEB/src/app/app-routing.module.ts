import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "@shared/guards/auth.guard";

//ENLACE A LA PAGINAS DE LOS MODULOS
const childrenRoutes: VexRoutes = [
  {
    path: "estadisticas",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  //ENRUTAR LOS MODULOS
  //ENRUTAMOS LOS COMPONETES DE LAS PAGINAS QUE SE CREARON

  //////***CATEGORIA - PASO 6 */
  {
    path: "categorias",
    loadChildren: () =>
      import("./pages/category/category.module").then((m) => m.CategoryModule),
    data: {
      containerEnabled: true,
    },
  },
  //////***PROVIDER - PASO 6 */
  {
    path: "proveedores",
    loadChildren: () =>
      import("./pages/provider/provider.module").then((m) => m.ProviderModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "almacenes",
    loadChildren:()=>
      import("./pages/warehouse/warehouse.module").then((m)=>m.WarehouseModule),
      data: {
        containerEnabled:true
      }
  },
  {
    path: "productos",
    loadChildren:()=>
      import("./pages/product/product.module").then((m)=>m.ProductModule),
      data: {
        containerEnabled:true
      }
  },
  {
    path: "proceso-compras",
    loadChildren:()=>
      import("./pages/purcharse/purcharse.module").then((m)=>m.PurcharseModule),
      data: {
        containerEnabled:true
      }
  },
  {
    path: "proceso-ventas",
    loadChildren:()=>
      import("./pages/sale/sale.module").then((m)=>m.SaleModule),
      data: {
        containerEnabled:true
      }
  },
  {
    path: "clientes",
    loadChildren:()=>
      import("./pages/client/client.module").then((m)=>m.ClientModule),
      data: {
        containerEnabled:true
      }
  },
  {
    path: "usuarios",
    loadChildren:()=>
      import("./pages/client/client.module").then((m)=>m.ClientModule),
      data: {
        containerEnabled:true
      }
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "estadisticas",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    //Login Paso 2 -  autorizamos y protegemos la demas rutas
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

//////***CATEGORIA - PASO 7 */
//////***PROVIDER - PASO 7 */
//LUEGO ENRUTA EN EL DASBOARD, LOS MUDULO DE LA LISTA (app/app-routing.module)
