import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  ClientById,
  ClientResponse,
} from "../models/client-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { ClientRequest } from "../models/client-request.interface";

@Injectable({
  providedIn: "root",
})
export class ClientService {
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
      endpoint.LIST_CLIENT
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

    response.data.forEach((client: ClientResponse) => {
      client.badgeColor =
        badgeColors[client.state] || "text-gray bg-gray-light";
      client.icEdit = getIcon("icEdit", "Editar Cliente", true);
      client.icDelete = getIcon("icDelete", "Eliminar Cliente", true);
    });
    return response;
  }

  clientRegisterServices(clientId: ClientRequest): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.CLIENT_REGISTER}`;
    return this._http.post(requestUrl, clientId).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  clientByIdServices(clientId: number): Observable<ClientById> {
    const requestUrl = `${environment.api}${endpoint.CLIENT_BY_ID}${clientId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  clientEditService(
    clientId: number,
    client: ClientRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.CLIENT_EDIT}${clientId}`;
    return this._http.put<BaseResponse>(requestUrl, client).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  clientRemoveServices(clientId: number): Observable<void> {
    const requestUrl = `${environment.api}${endpoint.CLIENT_REMOVE}${clientId}`;
    return this._http.put(requestUrl, clientId).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
