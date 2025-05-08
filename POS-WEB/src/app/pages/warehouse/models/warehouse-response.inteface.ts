////***ALMACEN - PASO 1 */

//CREAMOS UNA INTERFAS, CON LAS (DATOS,ACIONES) QUE MOSTRARA EN LA TABLA
export interface WarehouseResponse {
  warehouseId: number;
  name: string;
  auditCreateDate: Date;
  state: number;
  stateWarehouse: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

//CREAMOS UNA INTERFA, CON LOS MISMO ATRIBUTOS DEL BACKEND DEL "ID"
//PARA OBTENER SU ID Y EL REGISTRO Y ELIMINAR
export interface WarehouseById {
  warehouseId: number;
  name: string;
  state: number;
}

////SIGUE***PROVIDER - PASO 2 */
//CREAMOS LA LISTAS DE LOS MUDOLOS QUE SE CREARON PARA LA API DE PROVIDER (shared/apis/endpoint)
