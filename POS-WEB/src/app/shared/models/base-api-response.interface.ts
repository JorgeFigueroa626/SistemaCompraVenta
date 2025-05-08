//CLASE RESPONSES
// export interface BaseApiResponse {
//   data: any;
// }

//RESPUESTA DE LA CONSULTA A LA API, SI REGISTRO LOS DATOS
// export interface BaseResponse<D = any> {
//   isSuccess: boolean;
//   data: D | null;
//   totalRecords: number;
//   message: any;
//   errors: any;
// }

export interface BaseResponse {
  isSuccess: boolean;
  data: any;
  totalRecords: number;
  message: any;
  errors: any;
}
