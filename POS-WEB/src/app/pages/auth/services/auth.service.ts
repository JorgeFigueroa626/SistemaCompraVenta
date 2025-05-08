import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { endpoint, httpOptions } from "@shared/apis/endpoint";
import { map } from "rxjs/operators";
import { BaseResponse } from "@shared/models/base-api-response.interface";

@Injectable({
  providedIn: "root",
})
//Login Paso 4 - creamos loa servicios para generar un token
export class AuthService {
  private user: BehaviorSubject<BaseResponse>;

  //HACEMOS PUBLICO EL TOKEN, PARA SER USADO POR CUALQUIER SERVICIO
  public get userToken(): BaseResponse {
    return this.user.value;
  }

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<BaseResponse>(
      JSON.parse(localStorage.getItem("token"))
    );
  }

  //login API -  obtenemos los token API
  login(req: Login, authType: string): Observable<BaseResponse> {
    localStorage.setItem("authType", "Interno");
    const requestUrl = `${environment.api}${endpoint.LOGIN}?authType=${authType}`;
    return this.http.post<BaseResponse>(requestUrl, req, httpOptions).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          //capturamos y almacenamos el token
          localStorage.setItem("token", JSON.stringify(resp.data));
          //unimos el token
          this.user.next(resp.data);
        }

        return resp;
      })
    );
  }

  //login Google 1 - obtenemos los token API y su token de GOOGLE
  loginWintGoogle(
    credential: string,
    authType: string
  ): Observable<BaseResponse> {
    localStorage.setItem("authType", "Externo");
    const requestUrl = `${environment.api}${endpoint.LOGIN_GOOGLE}?authType=${authType}`;
    return this.http
      .post<BaseResponse>(requestUrl, JSON.stringify(credential), httpOptions)
      .pipe(
        map((resp: BaseResponse) => {
          if (resp.isSuccess) {
            //capturamos y almacenamos el token
            localStorage.setItem("token", JSON.stringify(resp.data));
            //unimos el token
            this.user.next(resp.data);
          }

          return resp;
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    this.user.next(null);
    window.location.reload();
  }
}
