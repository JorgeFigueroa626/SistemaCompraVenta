import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { ClientService } from "../../services/client.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { componentSettings } from "./client-list-config";
import {
  DateRange,
  FiltersBox,
} from "@shared/models/search-options.interfaces";
import { RowClick } from "@shared/models/row-click.interface";
import { ClientResponse } from "../../models/client-response.interface";
import { ClientManageComponent } from "../client-manage/client-manage.component";
import Swal from "sweetalert2";

@Component({
  selector: "vex-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
  //ANIMACIONES PARA LA INTERFAS DE CATEGORIA
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ClientListComponent implements OnInit {
  component: any;
  constructor(
    customTitle: CustomTitleService,
    public _clientServices: ClientService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Clientes");
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

  //BUSCADOR DE FILTRO
  formatGetInputs() {
    let str = "";

    //por nombre,email,numero documento
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

  openDialogRegister() {
    this._dialog
      .open(ClientManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsClient(true);
        }
      });
  }

  //ACCION DE EDITAR Y ELIMINAR DEL ICONO
  //LLAMAMOS COMO GENERICO A SU CLIENT, PARA LA ACCION DE TODO SUS DATOS
  rowClick(rowClick: RowClick<ClientResponse>) {
    console.log("rowclick", rowClick);
    let action = rowClick.action;
    let client = rowClick.row;

    switch (action) {
      case "edit":
        this.clientEdit(client);
        break;
      case "remove":
        this.clientRemove(client);
        break;
    }
    return false;
  }

  //METODOS DE EDITAR
  //LLAMA AL FORMULARIO DEL MAMAGE
  //LLAMAMOS CON PARAMETRO EXTENDIDO CON TODO LOS ATRIBUTOS DE LA CLASE
  clientEdit(clientData: ClientResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = clientData;

    this._dialog.open(ClientManageComponent, {
      data: { dialogConfig, mode: "edit" },
      disableClose: true,
      width: "400px",
    })
    .afterClosed().subscribe((resp) => {
      if (resp) {
        this.setGetInputsClient(true);
      }
    });
  }

  //METODOS DE ELIMINAR
  //LLAMA AL FORMULARIO DEL MAMAGE
  //LLAMAMOS CON PARAMETRO EXTENDIDO CON TODO LOS ATRIBUTOS DE LA CLASE
  clientRemove(clientData: ClientResponse) {
    Swal.fire({
      title: `Confirma que se eliminara ${clientData.name}?`,
      text: "Se borrara de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79,109,253)",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._clientServices
          .clientRemoveServices(clientData.clientId)
          .subscribe(() => {
            this.setGetInputsClient(true);
          });
      }
    });
  }

  setGetInputsClient(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  //donwload excel
  get getDonwloadUrl() {
    return `Client?Download=True`;
  }
}
