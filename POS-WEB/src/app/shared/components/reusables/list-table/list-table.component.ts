import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { scaleFadeIn400ms } from "src/@vex/animations/scale-fade-in.animation";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { getEsPaginatorIntl } from "@shared/paginator-intl/es-paginator-intl";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { DefaultService } from "@shared/services/default.service";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { AlertService } from "@shared/services/alert.service";
import { startWith, switchMap } from "rxjs/operators";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { IconModule } from "@visurel/iconify-angular";
import { TableColumns, TableFooter } from "@shared/models/list-table.interface";
import { IconsService } from "@shared/services/icons.service";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";

//UTILIZAMOS LA OPCION "standalone"
//PARA SER REUTILIZABLE PARA CUALQUIER COMPONENTE O MUDLO, QUE REQUIERA UNA TABLA

@Component({
  selector: "app-list-table",
  standalone: true,
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    IconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    SharedModule
  ],
  templateUrl: "./list-table.component.html",
  styleUrls: ["./list-table.component.scss"],
  animations: [scaleFadeIn400ms, fadeInUp400ms],
  providers: [
    {
      //agregamos la paginacion
      provide: MatPaginatorIntl,
      useValue: getEsPaginatorIntl(),
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "standard" } as MatFormFieldDefaultOptions,
    },
  ],
})
export class ListTableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  //@Input() --> SE UTILIZA PARA RECIBIR DATOS DE COMPONENTES
  //configuramos las propiedades para la tabla
  @Input() service?: DefaultService;
  @Input() columns?: TableColumns<T>[];
  @Input() getInputs: any;
  @Input() numRecords?: number = 10;
  @Input() sortBy?: string;
  @Input() sortDir?: string = "asc";
  @Input() footer: TableFooter<T>[] = [];

  //@Output() --> SE UTILIZA PARA ENVIAR DATOS FUERA DE COMPONENTES
  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  changesGetInputs = new EventEmitter<T>();

  dataSource = new MatTableDataSource<T>();

  visibleColumns?: Array<keyof T | string>;
  visibleFooter?: Array<keyof T | string | object>;

  paginatorOptions = {
    pageSizeOptions: [this.numRecords, 20, 50],
    pageSize: this.numRecords,
    pageLength: 0,
  };

  icMin = IconsService.prototype.getIcon("icMin");
  icAdd = IconsService.prototype.getIcon("icAddDetail");

  constructor(
    private _spinner: NgxSpinnerService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    //injectamos el paginador y ordenador
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      //llamamos al metodo, para mostrar las columnas
      this.setVisibleColumns();
    }
    if (changes.getInputs && this.paginator) {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    }
  }

  //metodo de mostrar columnas y sus propiedades
  setVisibleColumns() {
    this.visibleColumns = this.columns
      .filter((columns: any) => columns.visible)
      .map((columns: any) => columns.property);
  }

  ngAfterViewInit(): void {
    //llamamos la metdo para mostrar las servicios
    this.getDataByService();
    this.sortChanges();
    this.paginatorChanges();
  }

  //metodo de servicios de la tabla
  async getDataByService() {
    this.changesGetInputs
      .pipe(
        startWith(""),
        switchMap(() => {
          this._spinner.show("modal-table");
          return this.service.GetAll(
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.getInputs
          );
        })
      )
      .subscribe((data: any) => {
        //llamamos al metodo para obtener los datos
        this.setData(data);
        this._spinner.hide("modal-table");
      });
  }

  //metodo para optenemos los datos de la API
  setData(data: any) {
    if (data.isSuccess) {
      this.setVisibleColumns();
      //parametizamos los datos de la API "totalRecords"
      this.paginatorOptions.pageLength = data.totalRecords;
      this.dataSource.data = data.data;
      if (data.footer) this.setFooter(data.footer);
    } else {
      this._alert.warn("Atencion", "Ha ocurrido un error al cargar los datos");
    }
  }

  setFooter(data: any) {
    this.visibleFooter = [];
    if (this.footer.length && data) {
      this.footer.forEach((e) => {
        this.visibleFooter.push({
          label: e.label,
          value: data[e.property],
          tooltip: e.toolip,
        });
      });
    }
  }

  sortChanges() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    });
  }

  paginatorChanges() {
    this.paginator.page.subscribe(() => {
      this.changesGetInputs.emit();
    });
  }

  substractQuantityPurcharse(row: any) {
    if (row.quantity > 0) {
      row.quantity--;
    }
    this.calculateTotalAmountPurcharse(row);
  }

  increaseQuantityPurcharse(row: any) {
    row.quantity++;
    this.calculateTotalAmountPurcharse(row);
  }

  calculateTotalAmountPurcharse(row: any) {
    const quantity = row.quantity;
    const unitPurcharsePrice = row.unitPurcharsePrice;

    if (quantity || unitPurcharsePrice) {
      row.totalAmount = (quantity * unitPurcharsePrice).toFixed(2);
    } else {
      row.totalAmount = "0.00";
    }
  }
}
