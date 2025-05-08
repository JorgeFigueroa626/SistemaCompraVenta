//INTERFAS DE LOS ATRIBUTOS QUE SE NECESITARA PARA REGISTRAR UNA PRODUCTO
export interface ProductRequest {
  code: string;
  name: string;
  stockMin: number;
  stockMax: number;
  image: File;
  unilSalePrice: number;
  categoryId: number;
  state: number;
}
