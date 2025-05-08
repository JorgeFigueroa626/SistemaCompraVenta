import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectAutoComponente } from "@shared/models/select-autocomplete.inteface";
import { AlertService } from "@shared/services/alert.service";
import { IconsService } from "@shared/services/icons.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { ProductDetailsResponse } from "src/app/pages/purcharse/models/purcharse-response";
import { SaleService } from "../../services/sale.service";
import { SaleDetailService } from "../../services/sale-detail.service";
import { ClientSelectService } from "@shared/services/client-select.service";
import { WarehouseSelectService } from "@shared/services/warehouse-select.service";
import { componentSettings } from "../sale-list/sale-list-config";
import { FiltersBox } from "@shared/models/search-options.interfaces";

@Component({
  selector: "vex-sale-create",
  templateUrl: "./sale-create.component.html",
  styleUrls: ["./sale-create.component.scss"],
  //ANIMACIONES PARA LA INTERFAS
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class SaleCreateComponent implements OnInit {
  componentSaleDetail;
  //icono
  icSale = IconsService.prototype.getIcon("icSales");
  icRemove = IconsService.prototype.getIcon("icDelete");

  //variales para el detalle
  cartDetails: any | ProductDetailsResponse[] = [];
  subtotal: number = 0;
  igv: number = 0;
  total: number = 0;

  //establecemos un parametro para la paginacion
  numRecordsProducts: number = 3;

  //saber si va registrar o actualizar
  mode: string;

  //llamamos por una select, a las tablas relacionadas de ventas
  clientSelect: SelectAutoComponente[];
  warehouseSelect: SelectAutoComponente[];

  //creamos una fromulario para el registro
  form: FormGroup;

  //parametrizamos su ID de una Venta
  saleId: number = 0;

  //ver los datales, sin los controles
  viewDetailRead: boolean = false;

  //ingresamos los datos en el fromulario, para registrar una venta
  initForm(): void {
    this.form = this._fb.group({
      clientId: ["", [Validators.required]],
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
    private _saleServices: SaleService,
    //injectamos los servicios de la clase relacionada
    private _clientSelectService: ClientSelectService,
    private _warehouseSelectService: WarehouseSelectService,
    public _saleDetailService: SaleDetailService
  ) {
    //INICIALIZAMOS EL FORMULARIO A VALIDAR
    this.initForm();
    //capturamos el ID de una compra
    this._activateRoute.params.subscribe((params) => {
      this.saleId = params["saleId"];
    });
  }

  ngOnInit(): void {
    this.listSelectClient();
    this.listSelectWarehouse();
    this.componentSaleDetail = componentSettings;
    //verificar si hay venta
    if (this.saleId > 0) {
      this.saleById(this.saleId);
      this.viewDetailRead = true;
    }
  }

  saleById(saleId: number) {
    this._saleServices.saleByIdService(saleId).subscribe((resp) => {
      this.form.reset({
        clientId: resp.clientId,
        warehouseId: resp.warehouseId,
        observation: resp.observation,
      });
      this.cartDetails = resp.saleDetails
      this.subtotal = resp.subTotal
      this.igv = resp.igv
      this.total = resp.totalAmount
    });
  }

  //seleciona al cliente
  listSelectClient(): void {
    this._clientSelectService.listSelectClient().subscribe((resp) => {
      this.clientSelect = resp;
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
    this.componentSaleDetail.filters.numFilter = data.searchValue;
    this.componentSaleDetail.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  //buscador por parametros
  formatGetInputs() {
    let str = "";

    if (this.componentSaleDetail.filters.textFilter != null) {
      str = `&numFilter=${this.componentSaleDetail.filters.numFilter}
             &textFilter=${this.componentSaleDetail.filters.textFilter}`;
    }
    this.componentSaleDetail.getInputs = str;
  }

  saleSave() {}
  removeFromCart(product: ProductDetailsResponse) {}

  //regresar
  back() {
    this._router.navigate(["proceso-compras"]);
  }
}
