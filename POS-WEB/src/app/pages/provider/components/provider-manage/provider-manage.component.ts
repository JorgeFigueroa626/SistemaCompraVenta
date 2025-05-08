import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { ProviderService } from "../../services/provider.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentTypesService } from "@shared/services/document-types.service";
import { DocumentType } from "@shared/models/document-type.interface";

@Component({
  selector: "vex-provider-manage",
  templateUrl: "./provider-manage.component.html",
  styleUrls: ["./provider-manage.component.scss"],
})
export class ProviderManageComponent implements OnInit {
  //ICONO X
  icClose = IconsService.prototype.getIcon("icClose");
  //CONFIGURA EN UN SELECT EL ESTADO
  configs = configs;

  //LLAMAMOS  AL MODULO QUE ESTA RELACIONADA EL PROVEEDOR
  documentTypes: DocumentType[];
  //CREAMOS UN FORMACION PARA LOS REGISTRO
  form: FormGroup;

  //DATOS O ATRIBUTOS DE UN FORMULARIO, PARA EL REGISTRO
  initForm(): void {
    this.form = this._fb.group({
      providerId: [0, [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      documentTypeId: ["", [Validators.required]],
      documentNumber: ["", [Validators.required]],
      address: [""],
      phone: [""],
      state: ["", [Validators.required]],
    });
  }

  //INICIALIZAMOS E INYECTAMOS LOS SERVICIOS QUE USUAREMOS
  constructor(
    @Inject(MAT_DIALOG_DATA) public data, //Verifica si el Dialog tiene Datos
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _providerServices: ProviderService,
    private _dialogRef: MatDialogRef<ProviderManageComponent>,
    //injectamos los servicios de la clase relacionada
    private _documentTypesService: DocumentTypesService
  ) {
    //INICIALIZAMOS EL FORMULARIO A VALIDAR
    this.initForm();
  }

  ngOnInit(): void {
    //INICIALIZAMOS, PARA OBTENER EL LISTADO, DEL BACKEND DE UN REGISTRO
    this.listDocumentTypes();
    //INICIALIZAMOS, PARA OBTENER EL ID, DEL BACKEND DE UN REGISTRO
    if (this.data.mode == "edit") {
      //console.log(this.data.data.providerId);
      //extrae los datos del registro selecionado
      this.providerById(this.data.dialogConfig.data.providerId);
    }
  }

  //EXTREA LOS LISTADOS DE DATOS DE LA CLASE RELACIONADA
  listDocumentTypes(): void {
    this._documentTypesService.listDocumentTypes().subscribe((resp) => {
      this.documentTypes = resp;
    });
  }

  //GUARDA LOS REGISTRO. QUE REGISTRAN O EDITA CON EXITO
  providerSave(): void {
    //validamos si es validos los datos
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    //EXTRAEMOS O CAPTURO SU VALOR DEL ID, QUE ES VALIDO
    const providerId = this.form.get("providerId").value;

    if (providerId > 0) {
      this.providerEdit(providerId);
    } else {
      this.providerRegister();
    }
  }

  providerRegister(): void {
    this._providerServices
      .ProviderRegister(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atencion", resp.message);
        }
      });
  }

  //LLAMAMOS SU ID, CON TODOS SU DATOS DEL SU ATRIBUTOS
  providerById(providerId: number): void {
    this._providerServices.ProviderById(providerId).subscribe((resp) => {
      //los datos del interfas para registrar
      this.form.reset({
        providerId: resp.providerId,
        name: resp.name,
        email: resp.email,
        documentTypeId: resp.documentTypeId,
        documentNumber: resp.documentNumber,
        address: resp.address,
        phone: resp.phone,
        state: resp.state,
      });
    });
  }

  providerEdit(providerId: number): void {
    this._providerServices
      .ProviderEdit(providerId, this.form.value)
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
