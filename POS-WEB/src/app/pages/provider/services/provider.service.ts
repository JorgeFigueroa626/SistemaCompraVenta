import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { endpoint } from "@shared/apis/endpoint";
import { ListProviderRequest } from "../models/list-provider-request.interface";
import { map } from "rxjs/operators";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import {
  ProviderById,
  ProviderResponse,
} from "../models/provider-response.interface";
import { ProviderRequest } from "../models/provider-request.interface";
import { AlertService } from "@shared/services/alert.service";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  ////***PROVIDER - PASO 4 */
  //CREAMOS LOS SERVICIOS PARA CONSUMIR DE LA API
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  //CREASMOS LOS SERVICIOS DE PROVIDER

  //**1ER SERVICIO
  //Invocamos un metedo Generico, Con parametros por defectos (GelAll)
  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${
      endpoint.LIST_PROVIDER
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;
    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: ProviderResponse) {
          switch (prov.state) {
            case 0:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              prov.badgeColor = "text-green bg-green-light";
              break;
            default:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
          }
          prov.icEdit = getIcon("icEdit", "Editar Proveedor", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Proveedor", true);
        });
        return resp;
      })
    );
  }

  //////SIGUE***PROVIDER - PASO 5 */
  //CREAMOS EL MODULO Y SU ENRUTADOR DE LA PAGINA PROVIDER (pages/provider)
  //Y CREAMOS SU COMPONETES DE LA LISTA Y MANAGE DE PROVIDER (pages/provider/provider-list)

  //////SIGUE***PROVIDER - PASO 6 */
  //ENRUTAMOS SU MODULO EN (app/app-routing.module.ts)

  ////***2DO SERVICIOS
  //REGISTRO DE PROVIDER
  //LE AGREGAMOS UNA INTERFAS COMO PARAMETRO "CategoryRequest", PARA RTEGISTRAR UNA CATEGROIA
  //QUE AL OBSERVABLE, NOS RESPONDERA SI EL REGISTRO SE HISO CORRECTAMENTE
  ProviderRegister(provider: ProviderRequest): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.PROVIDER_REGISTER}`;
    return this._http.post(requestUrl, provider).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  ////***3ER SERVICIO
  ///OBTENER EL ID, DE UN REGISTRO
  ProviderById(providerId: Number): Observable<ProviderById> {
    const requestUrl = `${environment.api}${endpoint.PROVIDER_BY_ID}${providerId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  ///**4TO SERVICIO
  ///EDITAR UN REGISTR
  ProviderEdit(
    providerId: number,
    provider: ProviderRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.PROVIDER_EDIT}${providerId}`;
    return this._http.put<BaseResponse>(requestUrl, provider);
    // .pipe(
    //   map((resp: BaseResponse) => {
    //     return resp;
    //   })
    // );
  }

  ///**5TO SERVICIO
  ////ELIMINAR UN REGISTRO
  ProviderRemove(providerId: number): Observable<void> {
    const requestUrl = `${environment.api}${endpoint.PROVIDER_REMOVE}${providerId}`;
    return this._http.put(requestUrl, providerId).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
