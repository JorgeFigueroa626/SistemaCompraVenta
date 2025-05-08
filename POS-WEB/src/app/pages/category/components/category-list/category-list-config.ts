import { CategoryResponse } from "src/app/pages/category/models/category-response.interface";
import { GenericValidators } from "@shared/validators/generic-validators";
import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interfaces";
import { MenuItems } from "@shared/models/menu-items.interface";
import { IconsService } from "@shared/services/icons.service";

//////***CATEGORIA - PASO 8 */

//BUSCADOR DE CATEGORIA POR NOMBRE Y DESCRIPCION
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
    label: "Descripcion",
    value: 2,
    placeholder: "Buscar por Descripcion",
    validation: [GenericValidators.defaultDescription],
    validation_desc: "Solo se permite letras y numeros en esta busqueda.",
    icon: "icDescripcion",
  },
];

//BUSCADOR DE CATEGORIA POR ESTADO
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
//CONFIGURAMOS LOS DATOS PARA LA TABLA DE CATEGORIA

const tableColumns: TableColumns<CategoryResponse>[] = [
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
    label: "DESCRIPCION", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "description", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text", //TIPO DE DATO
    sticky: false,
    sort: true,
    sortProperty: "description",
    visible: true,
    download: true,
  },
  {
    label: "F. CREACION", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "auditCreateDate", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime", //TIPO DE DATO
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO", //NOMBRE PARA LA COLUMNA
    cssLabel: ["font-bold", "text-sm"],
    property: "stateCategory", //NOMBRE DEL DATO DEL BACKEND
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge", //TIPO DE DATO
    sticky: false,
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

//datos del buscador
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
  icCategory: IconsService.prototype.getIcon("icCategory"),
  icCalendarMonth: IconsService.prototype.getIcon("icCalendarMonth"),
  //LAYOUT SETTING FILTER
  menuOpen: false,
  //ORDENAR LA TABLE SETTINGS
  tableColumns: tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  getInputs,
  buttonLabel: "EDITAR",
  buttonLabel2: "ELIMINAR",
  //BUSCADOR POR FILTRO
  menuItems: menuItems,
  searchOptions: searchOptions,
  //FILTRO POR FECHAS
  filters_dates_active: false,
  filters: filters,
  resetFilters,
  datesFilterArray: ["Fecha de creacion"],
  filename: "listado-de-categorias",
};

//////SIGUE***CATEGORIA - PASO 9 */
//INYECTAMOS TODAS LAS CONFIGURACIONES DE LA TABLA, EN EL COMPONENTE DE LISTA DE CATEGORIAS
//(category\components\category-list\category-list.component.ts)
