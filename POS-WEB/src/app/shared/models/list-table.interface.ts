//columna dimanica
export interface TableColumns<T> {
  label: string;
  cssLabel: string[];
  property: keyof T | string;
  cssProperty: string[];
  subProperty?: keyof T | string;
  cssSubProperty?: string[];
  type:
    | "text"
    | "number"
    | "quantityPurcharse"
    | "unitPurcharsePrice"
    | "totalAmount"
    | "date"
    | "datetime"
    | "time"
    | "icon"
    | "button"
    | "badge"
    | "image"
    | "currency"
    | "textUppercase";
  visible: boolean;
  sort: boolean;
  sortProperty?: string;
  action?: string;
  sticky: boolean;
  tooltip?: string;
  download?: boolean;
  property_dowload?: string;
}

//footer dinamico
export interface TableFooter<T> {
  label: string;
  property: keyof T | string;
  toolip: string;
}
