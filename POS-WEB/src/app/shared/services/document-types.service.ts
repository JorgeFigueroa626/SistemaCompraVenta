import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { DocumentType } from "@shared/models/document-type.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DocumentTypesService {
  constructor(private _http: HttpClient) {}

  listDocumentTypes(): Observable<DocumentType[]> {
    const requestUrl = `${environment.api}${endpoint.LIST_DOCUMENT_TYPES}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse)=>{
        return resp.data;
      })
    )
  }
}
