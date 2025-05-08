import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { SaleService } from "../../services/sale.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { componentSettings } from "./sale-list-config";
import {
  DateRange,
  FiltersBox,
} from "@shared/models/search-options.interfaces";
import { RowClick } from "@shared/models/row-click.interface";
import { SaleResponse } from "../../models/sale-response";

@Component({
  selector: "vex-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.scss"],
  //ANIMACIONES PARA LA INTERFAS DE CATEGORIA
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class SaleListComponent implements OnInit {
  component;
  constructor(
    custonTitle: CustomTitleService,
    public _saleService: SaleService,
    private _router: Router,
    public _dialog: MatDialog
  ) {
    custonTitle.set("Ventas");
  }

  //INYECTAMOS LAS CONFIGURACIONES DE DATOS DE LA TABLAS
  ngOnInit(): void {
    this.component = componentSettings;
  }

  //BUSCAR POR NOMBRE Y DESCRIPCION
  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  //BUSCAR POR RANGO DE FECHA
  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  //resetear fechas
  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  //BUSCADOR DE FILTRO
  formatGetInputs() {
    let str = "";

    //por nombre,email,numero documento
    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    //POR RANGO DE FECHA
    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    //refresca los filtro
    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
    this.component.getInputs = str;
  }

  //ruta de la nueva ventas
  newSale() {
    this._router.navigate(["/proceso-ventas/crear"]);
  }

  rowClick(rowClick: RowClick<SaleResponse>) {
    let action = rowClick.action;
    let sale = rowClick.row;

    switch (action) {
      case "viewDetail":
        this.saleViewDetail(sale);
        break;
      case "cancel":
        this.saleCancel(sale);
        break;
    }

    return false;
  }

  //ver detalle de ventas
  saleViewDetail(sale: SaleResponse) {
    this._router.navigate(["/proceso-ventas/crear", sale.saleId]);
  }

  saleCancel(sale: SaleResponse) {
    throw new Error("Method not implemented.");
  }

  setGetInputsSale(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  //donwload excel
  get getDonwloadUrl() {
    return `Sale?Download=True`;
  }
}
