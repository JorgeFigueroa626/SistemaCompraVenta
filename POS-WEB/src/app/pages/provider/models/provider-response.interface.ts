////***PROVIDER - PASO 1 */

//CREAMOS UNA INTERFAS, CON LAS (DATOS,ACIONES) QUE MOSTRARA EN LA TABLA

export interface ProviderResponse {
  providerId: number;
  name: string;
  email: string;
  documentType: number;
  documentNumber: string;
  address: string;
  phone: string;
  auditCreateDate: Date;
  state: number;
  stateProvider: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

//CREAMOS UNA INTERFA, CON LOS MISMO ATRIBUTOS DEL BACKEND DEL "ID"
//PARA OBTENER SU ID Y EL REGISTRO Y ELIMINAR
export interface ProviderById {
  providerId: number;
  name: string;
  email: string;
  documentTypeId: number;
  documentNumber: string;
  address: string;
  phone: string;
  state: number;
}

////SIGUE***PROVIDER - PASO 2 */
//CREAMOS LA LISTAS DE LOS MUDOLOS QUE SE CREARON PARA LA API DE PROVIDER (shared/apis/endpoint)
