import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';

  //////***CATEGORIA - PASO 7 */
//ENRUTARA EN EL DASBOARD, EL MUDULO DE LA LISTA DE CATEGORIA
const routes: Routes = [
  {
    path:'',
    component: CategoryListComponent,
    data: {
      scrollDisable: true,
      toolbarShadowEnable:true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }

   //////SIGUE***CATEGORIA - PASO 8 */
   //CONFIGURAMOS LOS DATOS DE LA INTERFAS DE LA LISTA CATEGORIA (pages/category/categrory/category-lis-config)