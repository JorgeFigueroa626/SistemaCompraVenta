import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { IconsService } from "@shared/services/icons.service";
import { publish } from "rxjs/operators";
import { statesSelect } from "src/static-data/configs";
import { WarehouseService } from "../../services/warehouse.service";

@Component({
  selector: "vex-warehouse-manage",
  templateUrl: "./warehouse-manage.component.html",
  styleUrls: ["./warehouse-manage.component.scss"],
})
export class WarehouseManageComponent implements OnInit {
  //icono X
  icClose = IconsService.prototype.getIcon("icClose");
  //select de los estados
  configs = statesSelect;

  //creamos un formulario para los registros
  form: FormGroup;

  //iniciamos el registro del fomulario
  //con los atributos a registrar
  initForm(): void {
    this.form = this._fb.group({
      //los agrupamos en el formulario
      warehouseId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, //cambia el titulo del formulario,dependiendo la accion
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _warehouseService: WarehouseService,
    private _dialogRef: MatDialogRef<WarehouseManageComponent>
  ) {
    this.initForm();
  }

  //inicalializamos la extraccion de datos, de un registro
  ngOnInit(): void {
    //extraemos todos los que tienen datos
    if (this.data.mode == "edit") {
      //console.log(this.data);
      this.warehouseById(this.data.dialogConfig.data.warehouseId);
    }
  }

  //inciamos su ID, Extrallendo su datos del registro, en el modal
  warehouseById(warehouseId: number): void {
    this._warehouseService.WarehouseById(warehouseId).subscribe((resp) => {
      this.form.reset({
        warehouseId: resp.warehouseId,
        name: resp.name,
        state: resp.state,
      });
    });
  }

  //metodo de registrar o editar
  warehouseSave(): void {
    //validamos los campos invalidos
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    //extraemos o capturamos su valor ID, que es valido
    const warehouseId = this.form.get("warehouseId").value;

    //accion de editar o eliminar
    if (warehouseId > 0) {
      this.warehouseEdit(warehouseId);
    } else {
      this.warehouseRegister();
    }
  }

  //button de registrar
  warehouseRegister(): void {
    this._warehouseService
      .WarehouseRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atencion", resp.message);
        }
      });
  }

  //accion de editar
  warehouseEdit(warehouseId: number): void {
    this._warehouseService
      .WarehouseEdit(warehouseId, this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atencion", resp.message);
        }
      });
  }
}
