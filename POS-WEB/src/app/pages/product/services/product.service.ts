import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  ProductById,
  ProductResponse,
} from "../models/product-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { map } from "rxjs/operators";
import { ProductRequest } from "../models/product-request.interface";
import { ProductStockWarehouseResponse } from "../models/product-stock-warehouse-response.interfase";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}
  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${
      endpoint.LIST_PRODUCT
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;
    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp: BaseResponse) => this.transformProductData(resp)));
  }

  private transformProductData(response: BaseResponse): BaseResponse {
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };
    response.data.forEach((product: ProductResponse) => {
      product.badgeColor =
        badgeColors[product.state] || "text-gray bg-gray-light";
      product.icView = getIcon("icVisibility", "Ver stock Producto", true);
      product.icEdit = getIcon("icEdit", "Editar Producto", true);
      product.icDelete = getIcon("icDelete", "Eliminar Producto", true);
    });
    return response;
  }

  //servicio de registrar un registro
  ProductRegister(product: ProductRequest): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.PRODUCT_REGISTER}`;
    //creamos un metodo FormData, para obtener datos de tipos archivos IMG
    const formDataProduct = this._builFormDataProduct(product);
    return this._http.post<BaseResponse>(requestUrl, formDataProduct);
    // .pipe(
    //   map((resp: BaseResponse) => {
    //     return resp;
    //   })
    // );
  }

  //servicio para editar un registro
  ProductEdit(
    productId: number,
    product: ProductRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.PRODUCT_EDIT}${productId}`;
    //creamos un metodo FormData, para obtener datos de tipos archivos IMG
    const formDataProduct = this._builFormDataProduct(product);
    return this._http.put<BaseResponse>(requestUrl, formDataProduct);
    // .pipe(
    //   map((resp: BaseResponse) => {
    //     return resp;
    //   })
    // );
  }

  //metodo de formulario, para obtener valores de tipo de archivo
  private _builFormDataProduct(product: ProductRequest): FormData {
    const formData = new FormData();
    //lo convertimos de tipo strig
    formData.append("code", product.code),
      formData.append("name", product.name),
      formData.append("stockMin", product.stockMin.toString()),
      formData.append("stockMax", product.stockMax.toString()),
      formData.append("categoryId", product.categoryId.toString()),
      formData.append("state", product.state.toString()),
      formData.append("image", product.image),
      formData.append("unilSalePrice", product.unilSalePrice.toString());

    return formData;
  }

  //servicio para obtener el ID del registro
  ProductById(productId: number): Observable<ProductById> {
    const requestUrl = `${environment.api}${endpoint.PRODUCT_BY_ID}${productId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  //servicio de eliminar
  ProductRemove(productId: number): Observable<void> {
    const requestUrl = `${environment.api}${endpoint.PRODUCT_REMOVE}${productId}`;
    return this._http.put(requestUrl, productId).pipe(
      map((resp: BaseResponse) => {
        if (resp) {
          this._alert.success("Excelenete", resp.message);
        }
      })
    );
  }

  //servicio de vista del producto
  ProductStockByWarehouse(
    productId: number
  ): Observable<ProductStockWarehouseResponse[]> {
    const requestUrl = `${environment.api}${endpoint.PRODUCT_STOCK_WAREHOUSE}${productId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }
}
