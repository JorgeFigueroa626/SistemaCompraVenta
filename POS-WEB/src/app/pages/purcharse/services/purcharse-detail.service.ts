import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ProductResponse } from "../../product/models/product-response.interface";
import { ProductDetailsResponse } from "../models/purcharse-response";

@Injectable({
  providedIn: "root",
})
export class PurcharseDetailService {
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
    response.data.forEach((product: ProductDetailsResponse) => {
      product.icAdd = getIcon("icAdd", "Agregar Producto al detalle", true);
      product.quantity = 0;
      product.unitPurcharsePrice = 0;
      product.totalAmount = 0;
    });
    return response;
  }
}
