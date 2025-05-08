import { Injectable } from "@angular/core";
import icEdit from "@iconify/icons-ic/round-edit";
import icDelete from "@iconify/icons-ic/round-delete";
import icArrowDropDown from "@iconify/icons-ic/round-arrow-drop-down";
import icSearch from "@iconify/icons-ic/round-search";
import icClose from "@iconify/icons-ic/round-close";
import icName from "@iconify/icons-ic/round-badge";
import icDescripcion from "@iconify/icons-ic/round-description";
import icVisibility from "@iconify/icons-ic/round-visibility";
import icVisibilityOff from "@iconify/icons-ic/round-visibility-off";
import icMail from "@iconify/icons-ic/round-mail";
import icViewHeadline from "@iconify/icons-ic/round-view-headline";
import icLabel from "@iconify/icons-ic/round-label";
import icProvider from "@iconify/icons-ic/round-group";
import icDashboard from "@iconify/icons-ic/round-dashboard";
import icCalendarMonth from "@iconify/icons-ic/twotone-calendar-today";
import icCategory from "@iconify/icons-ic/twotone-category";
import icCloudDowload from "@iconify/icons-ic/twotone-cloud-download";
import icToday from "@iconify/icons-ic/twotone-today";
import icRefrest from "@iconify/icons-ic/twotone-restart-alt";
import icWarehouse from "@iconify/icons-ic/twotone-widgets";
import icProduct from "@iconify/icons-ic/twotone-inventory-2";
import icManage from "@iconify/icons-ic/twotone-article";
import icUpload from "@iconify/icons-ic/twotone-upload-file";
import icSales from "@iconify/icons-ic/twotone-point-of-sale";
import icCancel from "@iconify/icons-ic/twotone-block";
import icAdd from "@iconify/icons-ic/twotone-add-shopping-cart";
import icMin from "@iconify/icons-ic/twotone-remove";
import icAddDetail from "@iconify/icons-ic/twotone-add";
import icClient from "@iconify/icons-ic/twotone-supervisor-account";

@Injectable({
  providedIn: "root",
})
export class IconsService {
  getIcon(icon: string) {
    //modulos
    if (icon == "icDashboard") {
      return icDashboard;
    }

    if (icon == "icProvider") {
      return icProvider;
    }

    if (icon == "icCategory") {
      return icCategory;
    }

    if (icon == "icWarehouse") {
      return icWarehouse;
    }

    if (icon == "icProduct") {
      return icProduct;
    }

    if(icon == "icClient"){
      return icClient
    }

    if(icon == "icSales"){
      return icSales
    }

    if (icon == "icManage") {
      return icManage;
    }

    //accion
    if (icon == "icEdit") {
      return icEdit;
    }

    if (icon == "icDelete") {
      return icDelete;
    }

    if (icon == "icCancel") {
      return icCancel;
    }

    if (icon == "icAdd") {
      return icAdd;
    }

    if (icon == "icMin") {
      return icMin;
    }
    if (icon == "icAddDetail") {
      return icAddDetail;
    }

    if (icon == "icArrowDropDown") {
      return icArrowDropDown;
    }

    if (icon == "icSearch") {
      return icSearch;
    }

    if (icon == "icClose") {
      return icClose;
    }

    if (icon == "icRefrest") {
      return icRefrest;
    }

    //atributos
    if (icon == "icName") {
      return icName;
    }

    if (icon == "icDescripcion") {
      return icDescripcion;
    }

    if (icon == "icUpload") {
      return icUpload;
    }

    if (icon == "icVisibility") {
      return icVisibility;
    }

    if (icon == "icVisibilityOff") {
      return icVisibilityOff;
    }

    if (icon == "icMail") {
      return icMail;
    }

    if (icon == "icViewHeadline") {
      return icViewHeadline;
    }

    if (icon == "icLabel") {
      return icLabel;
    }

    if (icon == "icCalendarMonth") {
      return icCalendarMonth;
    }

    if (icon == "icCloudDowload") {
      return icCloudDowload;
    }

    if (icon == "icToday") {
      return icToday;
    }
  }
}
