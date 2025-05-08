import { Component, Inject, OnInit } from "@angular/core";
import icClose from "@iconify/icons-ic/twotone-close";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { CategoryService } from "src/app/pages/category/services/category.service";

@Component({
  selector: "vex-category-manage",
  templateUrl: "./category-manage.component.html",
  styleUrls: ["./category-manage.component.scss"],
})
export class CategoryManageComponent implements OnInit {
  //ICONO X
  icClose = icClose;
  //CONFIGURA EN UN SELECT EL ESTADO
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      categoryId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      description: [""],
      state: ["", [Validators.required]],
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _categoryService: CategoryService,
    public _dialogRef: MatDialogRef<CategoryManageComponent>
  ) {
    //INICIALIZAMOS EL FORMULARIO A VALIDAR
    this.initForm();
  }

  ngOnInit(): void {
    //INICIALIZAMOS, PARA OBTENER EL ID, DEL BACKEND DE UN REGISTRO
    if (this.data.mode == "edit") {
      //console.log(this.data);
      //extrae los datos del registro selecionado
      this.categoryById(this.data.dialogConfig.data.categoryId);
    }
  }

  //AL INICIALIZAR EL ID, EXTRAEMOS EL DATOS DE UN REGISTRO, EN EL MODAL
  categoryById(CategoryId: number): void {
    this._categoryService.CategoryById(CategoryId).subscribe((resp) => {
      //LOS DATTOS QUE SOLICITAMOS
      this.form.reset({
        categoryId: resp.categoryId,
        name: resp.name,
        description: resp.description,
        state: resp.state,
      });
    });
  }

  //GUARDA LOS REGISTRO. QUE REGISTRAN O EDITA CON EXITO
  categorySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        //MARCA LOS INPUT DEL FORMULARIO QUE SON INVALIDOS
        controls.markAllAsTouched();
      });
    }

    //EXTRAEMOS O CAPTURO SU VALOR DEL ID, QUE ES VALIDO
    const categoryId = this.form.get("categoryId").value;

    if (categoryId > 0) {
      this.categoryEdit(categoryId);
    } else {
      this.categoryRegister();
    }
  }

  categoryRegister(): void {
    this._categoryService
      .CategoryRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atencion", resp.message);
        }
      });
  }

  categoryEdit(categoryId: number): void {
    this._categoryService
      .CategoryEdit(categoryId, this.form.value)
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
