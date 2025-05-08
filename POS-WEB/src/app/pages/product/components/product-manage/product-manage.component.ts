import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { CategorySelectService } from "@shared/services/category-select.service";
import { IconsService } from "@shared/services/icons.service";
import { statesSelect } from "src/static-data/configs";
import { ProductService } from "../../services/product.service";
import { SelectAutoComponente } from "@shared/models/select-autocomplete.inteface";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { state } from "@angular/animations";

@Component({
  selector: "vex-product-manage",
  templateUrl: "./product-manage.component.html",
  styleUrls: ["./product-manage.component.scss"],
})
export class ProductManageComponent implements OnInit {
  //ICONO X
  icClose = IconsService.prototype.getIcon("icClose");
  //CONFIGURA EN UN SELECT EL ESTADO
  configs = statesSelect;

  //saber si va registrar o actualizar
  mode: string = "";

  //LLAMAMOS AL SERVICIO QUE ESTA RELACIONADA EL PRODUCTO, CON UN MODULO DE SELECT
  categorySelect: SelectAutoComponente[];
  //CREAMOS UN FORMACION PARA LOS REGISTRO
  form: FormGroup;

  //DATOS O ATRIBUTOS DE UN FORMULARIO, PARA EL REGISTRO
  initForm(): void {
    this.form = this._fb.group({
      productId: [0, [Validators.required]],
      code: ["", [Validators.required]],
      name: ["", [Validators.required]],
      stockMin: [0, [Validators.required]],
      stockMax: [0, [Validators.required]],
      image: [""],
      unilSalePrice: [0, [Validators.required]],
      categoryId: ["", [Validators.required]],
      state: ["", [Validators.required]],
    });
  }

  //INICIALIZAMOS E INYECTAMOS LOS SERVICIOS QUE USUAREMOS
  constructor(
    @Inject(MAT_DIALOG_DATA) public data, //Verifica si el Dialog tiene Datos
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productServices: ProductService,
    private _dialogRef: MatDialogRef<ProductManageComponent>,
    //injectamos los servicios de la clase relacionada
    private _categorySelectService: CategorySelectService
  ) {
    this.mode = data.mode;
    //INICIALIZAMOS EL FORMULARIO A VALIDAR
    this.initForm();
  }

  ngOnInit(): void {
    //lo inicializamos para obtener los datos
    this.listSelectCategories();

    //INICIALIZAMOS, PARA OBTENER EL ID, DEL BACKEND DE UN REGISTRO
    if (this.data.mode == "edit") {
      //console.log(this.data.data.providerId);
      //extrae los datos del registro selecionado
      this.productById(this.data.dialogConfig.data.productId);
    }
  }

  //EXTRAEMOS EN UN SELECT, LOS DATOS DE CATEGORIA, DE LA TABLA RELACIONADA PRODUCTO
  listSelectCategories(): void {
    this._categorySelectService.listSelectCategories().subscribe((resp) => {
      this.categorySelect = resp;
    });
  }

  //capturo valor de la IMG
  selectedImage(file: File) {
    this.form.get("image").setValue(file);
  }

  productSave(): void {
    //validador de datos
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    //capturamos su valor ID, del un registro
    const productId = this.form.get("productId").value;

    if (productId > 0) {
      this.productEdit(productId);
    } else {
      this.productRegister();
    }
  }

  productRegister(): void {
    this._productServices.ProductRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atencion", resp.message);
      }
    });
  }

  productById(productId: number): void {
    this._productServices.ProductById(productId).subscribe((resp) => {
      this.form.reset({
        productId: resp.productId,
        code: resp.code,
        name: resp.name,
        stockMin: resp.stockMin,
        stockMax: resp.stockMax,
        image: resp.image,
        unilSalePrice: resp.unilSalePrice,
        categoryId: resp.categoryId,
        state: resp.state,
      });
    });
  }

  productEdit(productId: number): void {
    this._productServices
      .ProductEdit(productId, this.form.value)
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
