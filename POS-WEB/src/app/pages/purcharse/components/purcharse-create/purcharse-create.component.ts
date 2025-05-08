import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { ProviderSelectService } from "@shared/services/provider-select.service";
import { PurcharseService } from "../../services/purcharse.service";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { SelectAutoComponente } from "@shared/models/select-autocomplete.inteface";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { IconsService } from "@shared/services/icons.service";
import { componentSettings } from "../purcharse-list/purcharse-list-config";
import { FiltersBox } from "@shared/models/search-options.interfaces";
import { PurcharseDetailService } from "../../services/purcharse-detail.service";
import {
  ProductDetailsResponse,
  PurcharseByIdResponse,
} from "../../models/purcharse-response";
import { RowClick } from "@shared/models/row-click.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { PurcharseRequest } from "../../models/purcharse-request.interface";
import { Observable, from } from "rxjs";

@Component({
  selector: "vex-purcharse-create",
  templateUrl: "./purcharse-create.component.html",
  styleUrls: ["./purcharse-create.component.scss"],
  //ANIMACIONES PARA LA INTERFAS DE CATEGORIA
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class PurcharseCreateComponent implements OnInit {
  componentPurcharseDetail;
  //ICONO
  icPurcharse = IconsService.prototype.getIcon("icSales");
  icRemove = IconsService.prototype.getIcon("icDelete");

  //variables para el addDetalle
  cartDetails: any | ProductDetailsResponse[] = [];
  subtotal: number = 0;
  igv: number = 0;
  total: number = 0;

  //muestra paginacion de 3 en 3
  numRecordsProducts: number = 3;

  //saber si va registrar o actualizar
  mode: string = "";

  //LLAMAMOS AL SERVICIO QUE ESTA RELACIONADA LA COMPRA, CON UN MODULO DE SELECT
  providerSelect: SelectAutoComponente[];
  warehouseSelect: SelectAutoComponente[];

  //CREAMOS UN FORMACION PARA LOS REGISTRO
  form: FormGroup;

  //parametrizar una datos o memoria o ID
  purcharseId: number = 0;
  //ver solo detalles de registro, sin las acciones
  viewDetailRead: boolean = false;

  //DATOS O ATRIBUTOS DE UN FORMULARIO, PARA EL REGISTRO
  initForm(): void {
    this.form = this._fb.group({
      providerId: ["", [Validators.required]],
      warehouseId: ["", [Validators.required]],
      observation: [""],
    });
  }

  //INICIALIZAMOS E INYECTAMOS LOS SERVICIOS QUE USUAREMOS
  constructor(
    //@Inject(MAT_DIALOG_DATA) public data, //Verifica si el Dialog tiene Datos
    private _fb: FormBuilder,
    private _router: Router,
    private _alert: AlertService,
    private _activateRoute: ActivatedRoute,
    //llamamos a los servicio creados, Nota: Ya no se necesita colocar el observable
    private _purcharseService: PurcharseService,
    //injectamos los servicios de la clase relacionada
    private _providerSelectService: ProviderSelectService,
    private _warehouseSelectService: WarehouseSelectService,
    public _purcharseDetailService: PurcharseDetailService
  ) {
    //this.mode = data.mode;
    //INICIALIZAMOS EL FORMULARIO A VALIDAR
    this.initForm();
    //capturamos el ID de una compra
    this._activateRoute.params.subscribe((params) => {
      this.purcharseId = params["purcharseId"];
    });
  }

  ngOnInit(): void {
    //lo inicializamos para obtener los datos, por el select
    this.listSelectProvider();
    this.listSelectWarehouse();
    this.componentPurcharseDetail = componentSettings;
    //verifico una compra
    if (this.purcharseId > 0) {
      this.purcharseById(this.purcharseId);
      this.viewDetailRead = true;
    }
  }

  //LLAMAMOS SU ID, CON TODOS SU DATOS DEL SU ATRIBUTOS
  purcharseById(purcharseId: number) {
    this._purcharseService
      .purcharseByIdService(purcharseId)
      .subscribe((resp) => {
        //los datos del interfas para registrar
        this.form.reset({
          providerId: resp.providerId,
          warehouseId: resp.warehouseId,
          observation: resp.observation,
        });
        this.cartDetails = resp.purcharseDetails;
        this.subtotal = resp.subTotal;
        this.igv = resp.igv;
        this.total = resp.totalAmount;
      });
  }

  //seleciona el proveedor
  listSelectProvider(): void {
    this._providerSelectService.listSelectProvider().subscribe((resp) => {
      this.providerSelect = resp;
    });
  }

  //seleciona al almacen
  listSelectWarehouse(): void {
    this._warehouseSelectService.listSelectWarehouse().subscribe((resp) => {
      this.warehouseSelect = resp;
    });
  }

  //metdod de buscar, llamando al metodo por parametro
  search(data: FiltersBox) {
    this.componentPurcharseDetail.filters.numFilter = data.searchValue;
    this.componentPurcharseDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  //buscador por parametros
  formatGetInputs() {
    let str = "";

    if (this.componentPurcharseDetail.filters.textFilter != null) {
      str = `&numFilter=${this.componentPurcharseDetail.filters.numFilter}
             &textFilter=${this.componentPurcharseDetail.filters.textFilter}`;
    }
    this.componentPurcharseDetail.getInputs = str;
  }

  //metodo de añadir al carrito
  rowClick(rowClick: RowClick<ProductDetailsResponse>) {
    let action = rowClick.action;
    let products = rowClick.row;

    switch (action) {
      case "addDetail":
        this.addDetial(products);
    }
  }

  back() {
    this._router.navigate(["proceso-compras"]);
  }

  addDetial(products: ProductDetailsResponse) {
    //verifico si exiten producto en carrito
    if (products.totalAmount <= 0) {
      return;
    }

    //agrego al carrito
    const productCopy = { ...products };

    const exitingProduct = this.cartDetails.find(
      (item) => item.code == productCopy.code
    );

    //si exite, Lo actualizamos
    if (exitingProduct) {
      exitingProduct.quantity += exitingProduct.quantity;
      exitingProduct.totalAmount =
        exitingProduct.quantity * exitingProduct.unitPurcharsePrice;
    } else {
      // y lo agregamos
      this.cartDetails.push(productCopy);
    }

    this.calculateSubTotal();
    this.calculateIgv();
    this.calculateTotal();
  }

  calculateSubTotal() {
    this.subtotal = this.cartDetails.reduce(
      (acc, product) => acc + product.quantity * product.unitPurcharsePrice,
      0
    );
  }

  calculateIgv() {
    this.igv = this.subtotal * 0.18;
  }

  calculateTotal() {
    this.total = this.subtotal + this.igv;
  }

  removeFromCart(product: ProductDetailsResponse) {
    //obtenemos su id
    const index = this.cartDetails.indexOf(product);

    //veificamos y lo eleiminamos
    if (index !== -1) {
      this.cartDetails.splice(index, 1);
    }
    //recalculamos su atributos
    this.calculateSubTotal();
    this.calculateIgv();
    this.calculateTotal();
  }

  purcharseSave() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    //compos para registrar una compra y lo mapeamos
    const purcharse: PurcharseRequest = {
      observation: this.form.value.observation,
      warehouseId: this.form.value.warehouseId,
      providerId: this.form.value.providerId,
      subTotal: this.subtotal,
      igv: this.igv,
      totalAmount: this.total,
      purcharseDetails: this.cartDetails.map(
        (product: ProductDetailsResponse) => ({
          productId: product.productId,
          quantity: product.quantity,
          unitPurcharsePrice: product.unitPurcharsePrice,
          total: product.totalAmount,
        })
      ),
    };

    this._purcharseService
      .purcharseRegisterService(purcharse)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._router.navigate(["proceso-compras"]);
        } else {
          this._alert.warn("Atencion", resp.message);
        }
      });
  }
}
