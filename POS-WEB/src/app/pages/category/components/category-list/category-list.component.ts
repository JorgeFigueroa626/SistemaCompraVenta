import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { CategoryService } from "src/app/pages/category/services/category.service";
import { componentSettings } from "./category-list-config";
import { DatesFilter } from "@shared/functions/actions";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CategoryManageComponent } from "../category-manage/category-manage.component";
import Swal from "sweetalert2";
import {
  DateRange,
  FiltersBox,
} from "@shared/models/search-options.interfaces";
import { CategoryResponse } from "../../models/category-response.interface";

@Component({
  selector: "vex-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
  //ANIMACIONES PARA LA INTERFAS DE CATEGORIA
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})

//////***CATEGORIA - PASO 9 */

//CONFIGURAMOS LAS INYECCIONES, PARA LAS ACCIONES DE LA INTERFAS DE CATEGORIAS
export class CategoryListComponent implements OnInit {
  component;

  constructor(
    customTitle: CustomTitleService,
    public _categoryServices: CategoryService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Categorias");
  }

  //INYECTAMOS LAS CONFIGURACIONES DE DATOS DE LA TABLAS
  ngOnInit(): void {
    this.component = componentSettings;
  }

  //BUSCAR POR TODOS LOS ESTADO
  setData(value: number) {
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
      str += `&numFilter=${this.component.filters.numFilter}
              &textFilter=${this.component.filters.textFilter}`;
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

  //SERVICIO DE REGISTRAR CATEGORIA
  //LLAMA AL SERVICIO DEL COMPONENTE DE REGISTRO DE CATEGORIA
  openDialogRegister() {
    this._dialog
      .open(CategoryManageComponent, {
        disableClose: true,
        width: "400px",
        data: { mode: "register" },
        //REFRESCA LA TABLA, AL REGISTRAR
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsProvider(true);
        }
      });
  }

  //ACCION DE EDITAR Y ELIMINAR
  rowClick(e: any) {
    let action = e.action;
    let category = e.row;

    switch (action) {
      case "edit":
        this.CategoryEdit(category);
        break;
      case "remove":
        this.CategoryRemove(category);
        break;
    }
    return false;
  }

  //METODOS DE EDITAR
  //LLAMA AL FORMULARIO DEL MAMAGE
  CategoryEdit(row: CategoryResponse) {
    //abre el dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    //lo abre con el componente de categroia
    this._dialog
      .open(CategoryManageComponent, {
        data: { dialogConfig, mode: "edit" },
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsProvider(true);
        }
      });
  }

  //METODOS DE ELIMINAR
  //LLAMA AL FORMULARIO DEL MAMAGE
  CategoryRemove(category: any) {
    Swal.fire({
      title: `Confirma que se eliminara ${category.name}?`,
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
        this._categoryServices
          .CategoryRemove(category.categoryId)
          .subscribe(() => {
            this.setGetInputsProvider(true);
          });
      }
    });
  }

  setGetInputsProvider(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  //donwload excel
  get getDonwloadUrl() {
    return `Category?Download=True`;
  }

  //////SIGUE***CATEGORIA - PASO 10 */
  //CONFIGURAMOS LOS ITEMS-LINKS DE NAVEGACION DEL FRONTEND PARA CADA MODULO DE NAVEGACION
  //(app/app.component.ts)
}
