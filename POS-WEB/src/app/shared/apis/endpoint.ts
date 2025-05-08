////***CATEGORIA - PASO 2 */

import { HttpHeaders } from "@angular/common/http";

//CREAMOS LA FIRMA DE LA CATEGROIA SUS MODULOS, PARA CONSULTAR A LA API DEL BACKEND

export const endpoint = {
  //MODULOS CREADOS DE LA CATEGORIAS EN LA API
  LIST_CATEGORY: "Category",
  LIST_SELECT_CATEGORIES: "Category/Select",
  CATEGORY_BY_ID: "Category/",
  CATEGORY_REGISTER: "Category/Register/",
  CATEGROY_EDIT: "Category/Edit/",
  CATEGORY_REMOVE: "Category/Remove/",

  //LOGIN AUTH MODULE
  //GENERATE_TOKE: 'User/Generate/Token',
  LOGIN: "Auth/Login",
  LOGIN_GOOGLE: "Auth/LoginWithGoogle",

  //MODULOS CREADOS DE LA PROVEEDOR EN LA API
  LIST_PROVIDER: "Provider",
  LIST_SELECT_PROVIDERS: "Provider/Select",
  PROVIDER_BY_ID: "Provider/",
  PROVIDER_REGISTER: "Provider/Register/",
  PROVIDER_EDIT: "Provider/Edit/",
  PROVIDER_REMOVE: "Provider/Remove/",

  //MODULOS CREADOS DE DOCUMENT TYPES
  LIST_DOCUMENT_TYPES: "DocumentType",

  //MODULOS CREADOS DE LA WAREHOUSE EN LA API
  LIST_WAREHOUSE: "Warehouse",
  LIST_SELECT_WAREHOUSES: "Warehouse/Select",
  WAREHOUSE_BY_ID: "Warehouse/",
  WAREHOUSE_REGISTER: "Warehouse/Register/",
  WAREHOUSE_EDIT: "Warehouse/Edit/",
  WAREHOUSE_REMOVE: "Warehouse/Remove/",

  //MODULOS CREADOS DE LA PRODUCTOS EN LA API
  LIST_PRODUCT: "Product",
  LIST_SELECT_PRODUCTS: "Product/Select",
  PRODUCT_BY_ID: "Product/",
  PRODUCT_REGISTER: "Product/Register/",
  PRODUCT_EDIT: "Product/Edit/",
  PRODUCT_REMOVE: "Product/Remove/",
  PRODUCT_STOCK_WAREHOUSE: "Product/ProductStockByWarehouse/",

  //MODULOS CREADOS PARA LAS COMPRAS EN LA API
  LIST_PURCHARSES: "Purcharse",
  PURCHARSE_BY_ID: "Purcharse/",
  PURCHARSE_REGISTER: "Purcharse/Register/",
  PURCHARSE_CANCEL: "Purcharse/Cancel/",

  //MODULOS CREADOS PARA LAS VENYAS EN LA API
  LIST_SALES: "Sale",
  SALE_BY_ID: "Sale/",
  SALE_REGISTER: "Sale/Register/",
  SALE_CANCEL: "Sale/Cancel/",

  //MODULOS CREADOS PARA EL CLIENTE EN LA API
  LIST_CLIENT: "Client",
  LIST_SELECT_CLIENTS: "Client/Select",
  CLIENT_BY_ID: "Client/",
  CLIENT_REGISTER: "Client/Register/",
  CLIENT_EDIT: "Client/Edit/",
  CLIENT_REMOVE: "Client/Remove/",
};

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

////SIGUE***CATEGORIA - PASO 3 */
//CREAMOS METODO PARA SOLICITAR LOS PARAMETROS DE LA API PARA LA INTERFAS (models/category/list-category)
