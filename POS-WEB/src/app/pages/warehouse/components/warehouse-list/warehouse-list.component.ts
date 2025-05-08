import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { componentSettings } from "./warehouse-list-config";
import {
  DateRange,
  FiltersBox,
} from "@shared/models/search-options.interfaces";
import { WarehouseService } from "../../services/warehouse.service";
import { WarehouseManageComponent } from "../warehouse-manage/warehouse-manage.component";
import { WarehouseResponse } from "../../models/warehouse-response.inteface";
import Swal from "sweetalert2";
import { RowClick } from "@shared/models/row-click.interface";

@Component({
  selector: "vex-warehouse-list",
  templateUrl: "./warehouse-list.component.html",
  styleUrls: ["./warehouse-list.component.scss"],
  //ANIMACIONES PARA LA INTERFAS
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class WarehouseListComponent implements OnInit {
  component: any;
  constructor(
    cuscustomTitle: CustomTitleService,
    public _dialog: MatDialog,
    public _warehouseService: WarehouseService
  ) {
    cuscustomTitle.set("Almacenes");
  }

  //INYECTAMOS LAS CONFIGURACIONES DE DATOS DE LA TABLAS
  ngOnInit(): void {
    this.component = componentSettings;
  }

  //BUSCAR POR TODOS LOS ESTADO
  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
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

  //metodo de buscador
  formatGetInputs() {
    let str = "";

    //por nombre
    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    //por estado
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
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

  //metdod resetear los filtros
  setGetInputsWarehouses(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  //donwload excel
  get getDonwloadUrl() {
    return `Warehouse?Download=True`;
  }

  //llamar al dialog del modulo de agregar
  openDialogRegister() {
    this._dialog
      .open(WarehouseManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsWarehouses(true);
        }
      });
  }

  //accion del click de ELIMINAR O EDITAR
  rowClick(rowClick: RowClick<WarehouseResponse>) {
    console.log("rowclick", rowClick);
    let action = rowClick.action;
    let warehuose = rowClick.row;

    switch (action) {
      case "edit":
        this.warehouseEdit(warehuose);
        break;
      case "remove":
        this.warehouseRemove(warehuose);
        break;
    }
    return false;
  }

  //accion de editar
  //llamamos al formulario de editar
  warehouseEdit(warehouseData: WarehouseResponse) {
    //abre un nuevo formulario
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = warehouseData; //con los datos de la fila
    //habre el componente de manage
    this._dialog
      .open(WarehouseManageComponent, {
        data: { dialogConfig, mode: "edit" },
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsWarehouses(true);
        }
      });
  }

  //accion de eliminar
  warehouseRemove(warehouseData: WarehouseResponse) {
    Swal.fire({
      title: `Confirma que se eliminara ${warehouseData.name}?`,
      text: "Se borrara de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79,109,253)",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancel",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._warehouseService
          .WarehouseRemove(warehouseData.warehouseId)
          .subscribe(() => {
            this.setGetInputsWarehouses(true);
          });
      }
    });
  }
}
