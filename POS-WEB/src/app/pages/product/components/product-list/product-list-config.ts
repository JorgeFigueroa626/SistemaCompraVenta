import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interfaces";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ProductResponse } from "../../models/product-response.interface";

//BUSCADOR POR ATRIBUTOS
const searchOptions: SearchOptions[] = [
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

//BUSCADOR POR ESTADO
const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

//CONFIGURAMOS LOS DATOS PARA LA TABLA
const tableColumns: TableColumns<ProductResponse>[] = [
  {
    label: "", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "image", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image", //TIPO DE DATO
    sticky: true, //ESTATICO LA COLUNA
    sort: true,
    sortProperty: "image",
    visible: true,
    download: true,
  },
  {
    label: "CODE", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "code", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase", //TIPO DE DATO
    sticky: true,
    sort: true,
    sortProperty: "code",
    visible: true,
    download: true,
  },
  {
    label: "NOMBRE", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "name", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },

  {
    label: "CATEGÓRIA", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "category", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "category",
    visible: true,
    download: true,
  },

  {
    label: "STOCK MIN", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "stockMin", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-center"],
    type: "number", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "stockMin",
    visible: true,
    download: true,
  },
  {
    label: "STOCK MAX", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "stockMax", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-center"],
    type: "number", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "stockMax",
    visible: true,
    download: true,
  },
  {
    label: "PRECIO DE VENTA", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "unilSalePrice", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-center"],
    type: "currency", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "unilSalePrice",
    visible: true,
    download: true,
  },

  {
    label: "F. CREACION", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "auditCreateDate", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "stateProduct", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icView",
    cssProperty: [],
    type: "icon",
    action: "view",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

//resetar los filtros
const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";

//CONFIGURAMOS LAS EXPORTACIONES PARA EL DISEÑO DE LA INTERFAS EN EL HTML
export const componentSettings = {
  //ICONS
  icProduct: IconsService.prototype.getIcon("icProduct"),
  //ORDENAR LA TABLE SETTINGS
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  //BUSCADOR POR FILTRO
  menuItems,
  searchOptions,
  //FILTRO POR FECHAS
  filters,
  resetFilters,
  filename: "lista-de-productos",
};
