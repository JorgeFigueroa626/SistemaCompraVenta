import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interfaces";
import { GenericValidators } from "@shared/validators/generic-validators";
import { SaleResponse, ProductDetailsResponse } from "../../models/sale-response";
import { IconsService } from "@shared/services/icons.service";

//BUSCADOR POR ATRIBUTOS
const searchOptions: SearchOptions[] = [
  {
    label: "Venta",
    value: 1,
    placeholder: "Buscar por Venta",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta busqueda.",
    icon: "icName",
  },
];

//BUSCADOR POR ATRIBUTOS DE PRODUCTOS
const searchOptionsProduct: SearchOptions[] = [
  {
    label: "Codigo",
    value: 1,
    placeholder: "Buscar por codigo",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras y/o numeros en esta busqueda.",
    icon: "icName",
  },
  {
    label: "Nombre",
    value: 2,
    placeholder: "Buscar por nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta busqueda.",
    icon: "icName",
  },
];

//CONFIGURAMOS LOS DATOS PARA LA TABLA
const tableColumns: TableColumns<SaleResponse>[] = [
  {
    label: "DESCRIPCION", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "voucherDescription", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "voucherDescription",
    visible: true,
    download: true,
  },

  {
    label: "NUMERO VENTA", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "voucherNumber", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase", //TIPO DE DATO
    sticky: true, //ESTATICO LA COLUNA
    sort: true,
    sortProperty: "voucherNumber",
    visible: true,
    download: true,
  },

  {
    label: "CLIENTE", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "client", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: true, //ESTATICO LA COLUNA
    sort: true,
    sortProperty: "client",
    visible: true,
    download: true,
  },

  {
    label: "ALMACEN", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "warehouse", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false, //ESTATICO LA COLUNA
    sort: true,
    sortProperty: "warehouse",
    visible: true,
    download: true,
  },

  {
    label: "MONTO TOTAL", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "totalAmount", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "currency", //TIPO DE DATO
    sticky: true, //ESTATICO LA COLUNA
    sort: true,
    sortProperty: "totalAmount",
    visible: true,
    download: true,
  },
  {
    label: "F. DE COMPRAR", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "dateOfSale", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime", //TIPO DE DATO
    sticky: true, //ESTATICO LA COLUNA
    sort: true,
    sortProperty: "datePurcharse",
    visible: true,
    download: true,
  },

  {
    label: "",
    cssLabel: [],
    property: "icVisibility",
    cssProperty: [],
    type: "icon",
    action: "viewDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icCancel",
    cssProperty: [],
    type: "icon",
    action: "cancel",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

//CONFIGURAMOS LOS DATOS PARA LA DETALLES
const tableColumnsProducts: TableColumns<ProductDetailsResponse>[] = [
  {
    label: "", //IMG PARA LA COLUMNA
    cssLabel: ["font-bold", "text-xxs"],
    property: "image", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "image", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "image",
    visible: true,
    download: true,
  },
  {
    label: "CODE", //CODIGO PARA LA COLUMNA
    cssLabel: ["font-bold", "text-xxs"],
    property: "code", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "textUppercase", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "code",
    visible: true,
    download: true,
  },
  {
    label: "NOMBRE", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-xxs"],
    property: "name", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    subProperty: "category",
    cssSubProperty: ["text-xxs", "text-am-gray", "uppercase", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },

  {
    label: "CANTIDAD", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-xxs"],
    property: "quantity", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "quantityPurcharse", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "quantity",
    visible: true,
    download: true,
  },
  {
    label: "PRECIO U.", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-xxs"],
    property: "unitSalePrice", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "unitPurcharsePrice", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "unitSalePrice",
    visible: true,
    download: true,
  },
  {
    label: "MONTO TOTAL", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-xxs"],
    property: "totalAmount", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "totalAmount", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "totalAmount",
    visible: true,
    download: true,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

//resetar los filtros
const resetFilters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";

//CONFIGURAMOS LAS EXPORTACIONES PARA EL DISEÑO DE LA INTERFAS EN EL HTML
export const componentSettings = {
  //ICONS
  icSale: IconsService.prototype.getIcon("icSales"),
  //ORDENAR LA TABLE SETTINGS
  tableColumns,
  tableColumnsProducts,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  searchOptions,
  searchOptionsProduct,
  //FILTRO POR FECHAS
  filters,
  resetFilters,
  filename: "listado-de-ventas",
};
