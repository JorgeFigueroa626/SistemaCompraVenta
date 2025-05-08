import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path: "",
    component: ProductListComponent,
    data: {
      scrollDisable: true,
      toolbarShadowEnable:true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
