import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { scaleInOutAnimation } from "src/@vex/animations/scale-in-out.animation";
import { FormControl } from "@angular/forms";
import { SelectAutoComponente } from "@shared/models/select-autocomplete.inteface";
import { SharedModule } from "@shared/shared.module";
import { IconsService } from "@shared/services/icons.service";

@Component({
  selector: "app-select-autocomplete",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./select-autocomplete.component.html",
  styleUrls: ["./select-autocomplete.component.scss"],
  animations: [scaleInOutAnimation],
})
export class SelectAutocompleteComponent implements OnInit, OnChanges {
  //propiedades del atributo
  @Input() control: FormControl = new FormControl(null);
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() listOptions: SelectAutoComponente[];
  @Input() required: boolean = false;
  //variable de solo lectura de ver detalles, desabilitando las acciones
  @Input() readOnly: boolean = false;

  optionsFilters: SelectAutoComponente[];
  icClose = IconsService.prototype.getIcon("icClose");
  icArrowDropDown = IconsService.prototype.getIcon("icArrowDropDown");

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let property in changes) {
      if (property === "listOptions") {
        if (changes.listOptions.previousValue !== undefined) {
          this.optionsFilters = this.filter("", this.listOptions);
        }

        if (changes.listOptions.currentValue !== undefined) {
          this.optionsFilters = this.filter("", this.listOptions);
        }

        if (changes.listOptions.currentValue === 0) {
          this.control.reset();
        }
      }
    }
    this.initMode();
  }

  ngOnInit(): void {
    this.initMode();
  }

  private filter(value, listOptions: SelectAutoComponente[]) {
    let filterValue = "";
    let optionsFiltered = [];

    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    }

    if (listOptions !== undefined && listOptions.length > 0) {
      optionsFiltered = listOptions.filter((option) => {
        return option.description.toLowerCase().includes(filterValue);
      });
      this.placeholder = this.label;
    } else {
      this.placeholder = "El listado de " + this.label + " está vacio";
    }
    return optionsFiltered;
  }

  private initMode() {
    this.optionsFilters = this.listOptions;
    this.control.valueChanges.subscribe((value) => {
      if (value) {
        this.optionsFilters = this.filter(value, this.listOptions);
      } else {
        this.optionsFilters = this.filter("", this.listOptions);
      }

      this.checkOption(this.control.value, this.listOptions);
    });
    this.control.enable();
  }

  private checkOption(value, listOptions: SelectAutoComponente[]) {
    if (listOptions) {
      let ids = listOptions.map((option) => option.id);
      let isValid = ids.includes(value);
      if (isValid) {
        this.control.reset;
      } else {
        if (this.required) this.control.setErrors({ required: true });
      }
    }
  }

  showDropdown(id: string) {
    let selectValue = null;
    if (this.listOptions && id) {
      let option = this.listOptions.find((option) => option.id === id);
      selectValue = option !== undefined ? option.description : null;
    }
    return selectValue;
  }
}
