////***PRODUCT - PASO 1 */

//CREAMOS UNA INTERFAS, CON LAS (DATOS,ACIONES) QUE MOSTRARA EN LA TABLA

export interface ProductResponse {
  productId: number;
  code: string;
  name: string;
  stockMin: number;
  stockMax: number;
  image: string;
  unilSalePrice: number;
  category: number;
  auditCreateDate: Date;
  state: number;
  stateProduct: string;
  badgeColor: string;
  icView: any;
  icEdit: any;
  icDelete: any;
}

//CREAMOS UNA INTERFA, CON LOS MISMO ATRIBUTOS DEL BACKEND DEL "ID"
//PARA OBTENER SU ID Y EL REGISTRO Y ELIMINAR
export interface ProductById {
  productId: number;
  code: string;
  name: string;
  stockMin: number;
  stockMax: number;
  image: string;
  unilSalePrice: number;
  categoryId: number;
  state: number;
}
