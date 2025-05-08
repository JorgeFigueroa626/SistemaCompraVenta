import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { SelectAutoComponente } from "@shared/models/select-autocomplete.inteface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategorySelectService {
  constructor(private _http: HttpClient) {}

  listSelectCategories(): Observable<SelectAutoComponente[]> {
    const requestUrl = `${environment.api}${endpoint.LIST_SELECT_CATEGORIES}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }
}
