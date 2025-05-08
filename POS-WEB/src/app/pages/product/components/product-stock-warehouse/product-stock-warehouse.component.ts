import { Component, Inject, OnInit } from "@angular/core";
import { ProductStockWarehouseResponse } from "../../models/product-stock-warehouse-response.interfase";
import { IconsService } from "@shared/services/icons.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProductService } from "../../services/product.service";
import { componentInit } from "./product-stock-warehouse-config";

@Component({
  selector: "vex-product-stock-warehouse",
  templateUrl: "./product-stock-warehouse.component.html",
  styleUrls: ["./product-stock-warehouse.component.scss"],
})
export class ProductStockWarehouseComponent implements OnInit {
  component; //para injectar en la tabla simple
  productStockByWarehouses: ProductStockWarehouseResponse[];
  codeProduct: string;
  nameProduct: string;
  icClose = IconsService.prototype.getIcon("icClose");

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, //obtenemos los datos
    private _productService: ProductService
  ) {
    //console.log("data: ", this.data);
    this.codeProduct = this.data.dialogConfig.data.code;
    this.nameProduct = this.data.dialogConfig.data.name;
  }

  ngOnInit(): void {
    this.component = { ...componentInit}; //injectamos los datos en la tabla simple
    this.productStockByWarehouse(this.data.dialogConfig.data.productId);
  }

  productStockByWarehouse(productId: number) {
    this._productService
      .ProductStockByWarehouse(productId)
      .subscribe((resp: ProductStockWarehouseResponse[]) => {
        this.productStockByWarehouses = resp;
      });
  }
}
