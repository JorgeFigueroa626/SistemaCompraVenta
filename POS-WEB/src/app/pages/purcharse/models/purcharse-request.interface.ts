export interface PurcharseRequest {
  observation: string;
  subTotal: number;
  igv: number;
  totalAmount: number;
  providerId: number;
  warehouseId: number;
  purcharseDetails: PurcharseDetailRequest[];
}

export interface PurcharseDetailRequest {
  productId: number;
  quantity: number;
  unitPurcharsePrice: number;
  total: number;
}
