////***CATEGORIA - PASO 1 */

//CREAMOS LA INTERFAS, CON LOS MISMO ATRIBUTOS DEL BACKEND

export interface CategoryResponse {
  categoryId: number;
  name: string;
  description: string;
  auditCreateDate: Date;
  state: number;
  stateCategory: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

//CLASE RESPONSES
// export interface CategoryApi {
//   data: any;
//   totalRecords: number;
// }

////SIGUE***CATEGORIA - PASO 2 */
//CREAMOS LA LISTAS DE LOS MUDOLOS QUE SE CREARON PARA LA API DE CATEGORIA (shared/apis/endpoint)
