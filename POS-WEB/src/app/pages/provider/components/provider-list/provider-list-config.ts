import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interfaces";
import { GenericValidators } from "@shared/validators/generic-validators";
import { TableColumns } from "@shared/models/list-table.interface";
import { IconsService } from "@shared/services/icons.service";
import { ProviderResponse } from "../../models/provider-response.interface";

//////***PROVIDER - PASO 8 */

//BUSCADOR DE PROVIDER POR NOMBRE, CORREO Y DOCUEMENTO
const searchOptions: SearchOptions[] = [
  {
    label: "Nombre",
    value: 1,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Solo se permite letras en esta busqueda.",
    icon: "icName",
  },
  {
    label: "Correo",
    value: 2,
    placeholder: "Buscar por correo",
    validation: [GenericValidators.emailValidation],
    validation_desc: "Solo se permite correo validos.",
    icon: "icMail",
  },
  {
    label: "N° Documento",
    value: 3,
    placeholder: "Buscar por N° Documento",
    validation: [GenericValidators.rucPersonaNatural],
    validation_desc: "Solo se permite documentos validos.",
    icon: "icDescripcion",
  },
];

//BUSCADOR DE PROVIDER POR ESTADO
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

//CONFIGURAMOS LOS DATOS PARA LA TABLA DE PROVIDER
const tableColumns: TableColumns<ProviderResponse>[] = [
  {
    label: "NOMBRE", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "name", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: true,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "CORREO", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "email", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "email",
    visible: true,
    download: true,
  },
  {
    label: "T. DOCUMENTO", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "documentType", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "documentType",
    visible: true,
    download: true,
  },
  {
    label: "N. DOCUMENTO", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "documentNumber", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "documentNumber",
    visible: true,
    download: true,
  },
  {
    label: "DIRECCION", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "address", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "address",
    visible: true,
    download: true,
  },
  {
    label: "TELEFONO", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "phone", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false, //NO ESTATICO LA COLUNA
    sort: true,
    sortProperty: "phone",
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
    property: "stateProvider", //NOMBRE DEL DATO DEL BACKEND
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
  icProvider: IconsService.prototype.getIcon("icProvider"),
  //icCalendarMonth: IconsService.prototype.getIcon("icCalendarMonth"),
  //LAYOUT SETTING FILTER
  //menuOpen: false,
  //ORDENAR LA TABLE SETTINGS
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  // buttonLabel: "EDITAR",
  // buttonLabel2: "ELIMINAR",
  //BUSCADOR POR FILTRO
  menuItems,
  searchOptions,
  //FILTRO POR FECHAS
  //filters_dates_active: false,
  filters,
  resetFilters,
  //datesFilterArray: ["Fecha de creacion"],
  filename:"lista-de-proveedores"
};

//////SIGUE***PROVIDER - PASO 9 */
//INYECTAMOS TODAS LAS CONFIGURACIONES DE LA TABLA, EN EL COMPONENTE DE LISTA DE PROVIDER
//provider\components\provider-list\provider-list.component.ts
