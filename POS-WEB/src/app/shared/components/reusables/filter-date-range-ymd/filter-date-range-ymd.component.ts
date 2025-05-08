import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { MomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MY_DATE_FORMATS } from "@shared/functions/date-format";
import moment, { Moment } from "moment";
import { FormControl, FormGroup } from "@angular/forms";
import { IconsService } from "@shared/services/icons.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-filter-date-range-ymd",
  standalone: true,
  imports: [SharedModule, MomentDateModule], //importamos el modulo, para utilizar sus modulos
  templateUrl: "./filter-date-range-ymd.component.html",
  styleUrls: ["./filter-date-range-ymd.component.scss"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class FilterDateRangeYmdComponent implements OnInit {
  //configuramos los datos de parametros de rangos de fecha
  @Input()
  start: string;

  @Input()
  end: string;

  @Input()
  maxDate: Moment = moment();

  @Output()
  rangeDate = new EventEmitter<{}>();

  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  icToday = IconsService.prototype.getIcon("icToday");

  constructor() {}

  ngOnInit(): void {}

  //selecion de rango de fecha
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.start || changes.end) {
      this.range.get("startDate").patchValue(this.start);
      this.range.get("endDate").patchValue(this.end);
    }
  }

  //accion del evento de rango de fecha
  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      this.emitDates();
    }
  }

  //rangos de fechas
  emitDates() {
    //valores de fechas
    const startDateControl = this.range.get("startDate").value;
    const endDateControl = this.range.get("endDate").value;

    //formateamos las fechas
    if (startDateControl & endDateControl) {
      const startDate = startDateControl.format("YYYY-MM-DD");
      const endDate = endDateControl.format("YYYY-MM-DD");

      //agrupamos en un objetos los rango
      const data = {
        startDate,
        endDate,
      };

      //obtenemos los rango de fechas
      this.rangeDate.emit(data);
    }
  }
}
