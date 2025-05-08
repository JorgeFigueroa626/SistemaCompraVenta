//INTERFAS DE LOS ATRIBUTOS QUE SE NECESITARA PARA REGISTRAR UNA PROVIDER
export interface ProviderRequest {
  name: string;
  email: string;
  documentTypeId: number;
  documentNumber: string;
  adress: string;
  phone: string;
  state: number;
}
