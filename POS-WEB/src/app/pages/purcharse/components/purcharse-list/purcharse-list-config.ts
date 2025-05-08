import { SearchOptions } from "@shared/models/search-options.interfaces";
import { GenericValidators } from "@shared/validators/generic-validators";
import {
  ProductDetailsResponse,
  PurcharseResponse,
} from "../../models/purcharse-response";
import { TableColumns } from "@shared/models/list-table.interface";
import { IconsService } from "@shared/services/icons.service";

//BUSCADOR POR ATRIBUTOS PROVEEDOR
const searchOptions: SearchOptions[] = [
  {
    label: "Proveedor",
    value: 1,
    placeholder: "Buscar por proveedor",
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
const tableColumns: TableColumns<PurcharseResponse>[] = [
  {
    label: "PROVEEDOR", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "provider", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase", //TIPO DE DATO
    sticky: true,
    sort: true,
    sortProperty: "provider",
    visible: true,
    download: true,
  },

  {
    label: "ALMACEN", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "warehouse", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase", //TIPO DE DATO
    sticky: true, //ESTATICO LA COLUNA
    sort: true,
    sortProperty: "warehouse",
    visible: true,
    download: true,
  },

  {
    label: "MONTO TOTLA", //NOMBRE PARA LA COLUMNA
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
    property: "datePurcharse", //NOMBRE DEL DATO DEL BACKEND
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

//CONFIGURAMOS LOS DATOS PARA LA DETALLE
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
    property: "unitPurcharsePrice", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "unitPurcharsePrice", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "unitPurcharsePrice",
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
  {
    label: "",
    cssLabel: [],
    property: "icAdd",
    cssProperty: [],
    type: "icon",
    action: "addDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
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
  icPurcharse: IconsService.prototype.getIcon("icSales"),
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
  filename: "listado-de-compras",
};
