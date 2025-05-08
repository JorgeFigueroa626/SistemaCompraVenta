import { convertDateToRequest } from "@shared/functions/helpers";
import { params } from "src/app/commons/params-api.interface";

////***CATEGORIA - PASO 3 */
//CREAMOS UN LISTADO Y CONFIGURAR PAGINACION, ORDEN, BUSCADOR

export class ListCategoryRequest extends params{
    constructor(
        numPage:number,
        order:'desc' | 'asc',
        sort:string,
        records:10 | 20 | 50,
        numFilter:number = 0,
        textFilter:string,
        stateFilter:number=null,
        private startDate:string, //fechaInicio
        private endDate:string, //fechaFinal
    ){
        super(
            true,
            numPage,
            order,
            sort,
            records,
            false,
            numFilter,
            textFilter,
            stateFilter
        )
            //configurar conversion formato de fecha
        this.startDate = convertDateToRequest(this.startDate, 'date')
        this.endDate = convertDateToRequest(this.endDate, 'date')
    }
}

////SIGUE***CATEGORIA - PASO 4 */
//CREAMOS LOS SERVICOS DE SOLICITUD PARA LA API (services/category)
