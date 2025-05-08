import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SaleByIdResponse, SaleResponse } from "../models/sale-response";
import { getIcon } from "@shared/functions/helpers";

@Injectable({
  providedIn: "root",
})
export class SaleService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}
  //servicio de lista de compra
  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${
      endpoint.LIST_SALES
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;
    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp: BaseResponse) => this.transformSaleData(resp)));
  }

  private transformSaleData(response: BaseResponse): BaseResponse {
    response.data.forEach((sale: SaleResponse) => {
      sale.icVisibility = getIcon(
        "icVisibility",
        "Ver detalles de ventas",
        true
      );
      sale.icCancel = getIcon("icCancel", "Anular venta", true);
    });
    return response;
  }

  saleByIdService(saleId: number): Observable<SaleByIdResponse> {
    const requestUrl = `${environment.api}${endpoint.SALE_BY_ID}${saleId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }
}
