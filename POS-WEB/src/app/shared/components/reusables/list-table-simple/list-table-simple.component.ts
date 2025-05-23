import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { TableColumnSimple } from "@shared/models/list-table-simple.interface";
import { getEsPaginatorIntl } from "@shared/paginator-intl/es-paginator-intl";
import { IconsService } from "@shared/services/icons.service";
import { SharedModule } from "@shared/shared.module";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "src/@vex/animations/scale-fade-in.animation";

@Component({
  selector: "app-list-table-simple",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./list-table-simple.component.html",
  styleUrls: ["./list-table-simple.component.scss"],
  animations: [scaleFadeIn400ms, fadeInUp400ms],
  providers: [
    {
      //agregamos la paginacion
      provide: MatPaginatorIntl,
      useValue: getEsPaginatorIntl(),
    },
    {
      //apariencia de tipo estadandar
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "standard" } as MatFormFieldDefaultOptions,
    },
  ],
})
export class ListTableSimpleComponent<T> implements OnInit, AfterViewInit {
  //@Input() --> SE UTILIZA PARA RECIBIR DATOS DE COMPONENTES
  //configuramos las propiedades para la tabla
  @Input() columns: TableColumnSimple<T>[];
  @Input() data: any;

  //@Output() --> SE UTILIZA PARA ENVIAR DATOS FUERA DE COMPONENTES
  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<T>;

  visibleColumns: Array<keyof T | string>;

  paginatorOptions = {
    pageSizeOptions: [5, 10, 200],
    pageSize: [5],
    pageLength: 0,
  };

  icSearch = IconsService.prototype.getIcon("icSearch");

  constructor() {}

  ngOnInit(): void {
    //iniciara mostrando los datos visibles
    if (this.data) {
      this.visibleColumns = this.columns.filter((column) => column.visible)
        .map((column) => column.property);

      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  ngAfterViewInit(): void {
    //llamamos la metdo para mostrar las servicios
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
