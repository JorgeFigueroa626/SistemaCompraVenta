import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { IconModule, IconService } from "@visurel/iconify-angular";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SearchOptions } from "@shared/models/search-options.interfaces";
import { IconsService } from "@shared/services/icons.service";
import { scaleInOutAnimation } from "src/@vex/animations/scale-in-out.animation";

@Component({
  selector: "app-search-box-multiple",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: "./search-box-multiple.component.html",
  styleUrls: ["./search-box-multiple.component.scss"],
  animations: [scaleInOutAnimation]
})
export class SearchBoxMultipleComponent implements OnInit {
  //iniciamos las propiedades para la busquedad
  form: FormGroup;
  @Input() searchOptions = [];
  @Input() currentValue: string = "";
  @Output() search = new EventEmitter<unknown>();

  labelSelecction: SearchOptions = {
    label: "",
    value: 0,
    placeholder: "",
    validation: "",
    validation_desc: "",
    icon: "",
  };

  constructor(private fb: FormBuilder, public iconsService: IconsService) {
    this.form = fb.group({
      searchValue: [""],
      searchData: [""],
    });
  }

  ngOnInit(): void {
    this.chacgeSelection(this.searchOptions[0]);
    this.form.controls["searchData"].valueChanges.subscribe((e) => {
      if (e.trim() == "") {
        this.submit();
      }
    });
  }

  chacgeSelection(options: SearchOptions) {
    this.labelSelecction = options;
    this.form.controls["searchValue"].setValue(options.value);
    this.labelSelecction.validation_desc = options.validation_desc
      ? options.validation_desc
      : "";

    let min_length = options.min_length ? options.min_length : 1;
    this.setSerchStringValidation(options.validation, min_length);
  }

  setSerchStringValidation(validation: [], minLength: number) {
    let searchData = this.form.get("searchData");
    let setValidation = [];

    setValidation.push(Validators.required);
    setValidation.push(Validators.minLength(minLength));

    if (validation) {
      validation.forEach((e) => {
        setValidation.push(e);
      });
    }
    searchData.setValidators(setValidation);
  }

  //accion de bucar datos
  submit() {
    let data = this.form.getRawValue();
    this.search.emit(data);
  }
  //limpiar buscador
  reset() {
    this.form.controls["searchData"].setValue("");
    this.submit();
  }
}
