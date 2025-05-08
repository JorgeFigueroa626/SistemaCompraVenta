import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interfaces";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { WarehouseResponse } from "../../models/warehouse-response.inteface";

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

//CONFIGURAMOS LOS DATOS PARA LA TABLA DE PROVIDER
const tableColumns: TableColumns<WarehouseResponse>[] = [
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
    property: "stateWarehouse", //NOMBRE DEL DATO DEL BACKEND
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

//datos de busquedas
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
    icWarehouse: IconsService.prototype.getIcon("icWarehouse"),
    //TABLAS
    tableColumns,
    initialSort: "Id",
    initialSortDir: "desc",
    //BUSCADOR
    getInputs,
    //BUSCADOR POR FILTRO
    menuItems,
    searchOptions,
    //FILTRO POR FECHAS
    filters,
    //RESETEAR LOS FILTRO
    resetFilters,
    //DESCARGAR
    filename:"lista-de-almacenes"
  };
  
  //////SIGUE***WAREHOUSE - PASO 9 */
  //INYECTAMOS TODAS LAS CONFIGURACIONES DE LA TABLA, EN EL COMPONENTE DE LISTA DE WAREHOUSE
  //warehouse\components\warehouse-list\warehouse-list.component.ts
