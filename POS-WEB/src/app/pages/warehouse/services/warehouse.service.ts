import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { getIcon } from "@shared/functions/helpers";
import { AlertService } from "@shared/services/alert.service";
import {
  WarehouseById,
  WarehouseResponse,
} from "../models/warehouse-response.inteface";
import { WarehouseRequest } from "../models/warehouse-request.interface";

@Injectable({
  providedIn: "root",
})
export class WarehouseService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  //**1ER SERVICIO
  //Invocamos un metedo Generico, Con parametros por defectos (GelAll)
  //Creamos el servicio de Lista de Almacen
  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${
      endpoint.LIST_WAREHOUSE
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http
      .get<BaseResponse>(requestUrl)
      .pipe(map((resp: BaseResponse) => this.transformWarehouse(resp)));
  }

  private transformWarehouse(response: BaseResponse): BaseResponse {
    const badgeColors: Record<number, string> = {
      0: "text-gray bg-gray-light",
      1: "text-green bg-green-light",
    };

    response.data.forEach((warehose: WarehouseResponse) => {
      warehose.badgeColor =
        badgeColors[warehose.state] || "text-gray bg-gray-light";
      warehose.icEdit = getIcon("icEdit", "Editar Almacen", true);
      warehose.icDelete = getIcon("icDelete", "Eliminar Almacen", true);
    });
    return response;
  }

  //creamos el servicio de obtener su ID, de un registro
  WarehouseById(warehouseId: number): Observable<WarehouseById> {
    const requestUrl = `${environment.api}${endpoint.WAREHOUSE_BY_ID}${warehouseId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  //creamos el servicio de registro o agregar
  WarehouseRegister(warehouse: WarehouseRequest): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.WAREHOUSE_REGISTER}`;
    return this._http.post(requestUrl, warehouse).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  //creamos el servicio de editar registro
  WarehouseEdit(
    warehouseId: number,
    warehouse: WarehouseRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.WAREHOUSE_EDIT}${warehouseId}`;
    return this._http.put<BaseResponse>(requestUrl, warehouse).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  //creamos el servicio de eliminar
  WarehouseRemove(warehouseId: number): Observable<void> {
    const requestUrl = `${environment.api}${endpoint.WAREHOUSE_REMOVE}${warehouseId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
