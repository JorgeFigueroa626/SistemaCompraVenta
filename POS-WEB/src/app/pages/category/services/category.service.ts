import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from "@shared/services/alert.service";
import { environment } from "src/environments/environment";
import { endpoint } from "@shared/apis/endpoint";
import { map } from "rxjs/operators";
import { CategoryRequest } from "../models/category-request.interface";
import { CategoryResponse } from "../models/category-response.interface";
import { Observable } from "rxjs";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
//npm install rxjs-compat
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  ////***CATEGORIA - PASO 4 */
  //CREAMOS LOS SERVICIOS PARA CONSUMIR DE LA API

  constructor(private _http: HttpClient, private _alert: AlertService) {}

  //CREASMOS LOS SERVICIOS DE CATEGRIAS

  //**1ER SERVICIO
  //Invocamos un metedo Generico, Con parametros por defectos (GelAll)
  GetAll(size, sort, order, page, getInputs): Observable<BaseResponse> {
    //CREAMOS LA CONEXION AL BACKEN DE LISTA CATEGORIAS
    const requestUrl = `${environment.api}${
      endpoint.LIST_CATEGORY
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    //SOLICITAMOS QUE RETORNE DE LA API, LOS PARAMATROS QUE LE ENVIAMOS
    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        data.data.forEach(function (e: CategoryResponse) {
          //DISEÑO DEL ESTADO DE CATEGORIAS
          switch (e.state) {
            case 0:
              e.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              e.badgeColor = "text-green bg-green-light";
              break;
            default:
              e.badgeColor = "text-gray bg-gray-light";
              break;
          }
          e.icEdit = getIcon("icEdit", "Editar Categoria", true);
          e.icDelete = getIcon("icDelete", "Eliminar Categoria", true);
        });
        return data;
      })
    );
  }

  //////SIGUE***CATEGORIA - PASO 5 */
  //CREAMOS EL MODULO Y SU ENRUTADOR DE LA PAGINA CATEGORIA (pages/category)
  //Y CREAMOS SU COMPONETES DE LA LISTA Y MANAGE DE CATEGORIA (pages/category/category-list)

  //////SIGUE***CATEGORIA - PASO 6 */
  //ENRUTAMOS SU MODULO EN (app/app-routing.module.ts)

  ////***2DO SERVICIOS
  //REGISTRO DE CATEGORIA
  //LE AGREGAMOS UNA INTERFAS COMO PARAMETRO "CategoryRequest", PARA RTEGISTRAR UNA CATEGROIA
  //QUE AL OBSERVABLE, NOS RESPONDERA SI EL REGISTRO SE HISO CORRECTAMENTE
  CategoryRegister(category: CategoryRequest): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.CATEGORY_REGISTER}`;
    return this._http.post(requestUrl, category).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  ////***3ER SERVICIO
  ///OBTENER EL ID, DE UN REGISTRO
  CategoryById(CategoryId: number): Observable<CategoryResponse> {
    const requestUrl = `${environment.api}${endpoint.CATEGORY_BY_ID}${CategoryId}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  ///**4TO SERVICIO
  ///EDITAR UN REGISTRO
  CategoryEdit(
    CategoryId: number,
    category: CategoryRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${environment.api}${endpoint.CATEGROY_EDIT}${CategoryId}`;
    return this._http.put(requestUrl, category).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  ///**5TO SERVICIO
  ////ELIMINAR UN REGISTRO
  CategoryRemove(CategoryId: number): Observable<void> {
    const requestUrl = `${environment.api}${endpoint.CATEGORY_REMOVE}${CategoryId}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
