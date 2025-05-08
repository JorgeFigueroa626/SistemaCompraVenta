import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/services/alert.service";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { ClientService } from "../../services/client.service";
import { DocumentType } from "@shared/models/document-type.interface";
import { DocumentTypesService } from "@shared/services/document-types.service";

@Component({
  selector: "vex-client-manage",
  templateUrl: "./client-manage.component.html",
  styleUrls: ["./client-manage.component.scss"],
})
export class ClientManageComponent implements OnInit {
  //ICONO X
  icClose = IconsService.prototype.getIcon("icClose");
  //CONFIGURA EN UN SELECT EL ESTADO
  configs = configs.statesSelect;

  //LLAMAMOS  AL MODULO QUE ESTA RELACIONADA EL PROVEEDOR
  documentTypes: DocumentType[];
  //CREAMOS UN FORMACION PARA LOS REGISTRO
  form: FormGroup;

  //DATOS O ATRIBUTOS DE UN FORMULARIO, PARA EL REGISTRO
  initForm(): void {
    this.form = this._fb.group({
      clientId: [0, [Validators.required]],
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
    private _clientServices: ClientService,
    private _dialogRef: MatDialogRef<ClientManageComponent>,
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
      this.clientById(this.data.dialogConfig.data.clientId);
    }
  }

  //EXTREA LOS LISTADOS DE DATOS DE LA CLASE RELACIONADA
  listDocumentTypes(): void {
    this._documentTypesService.listDocumentTypes().subscribe((resp) => {
      this.documentTypes = resp;
    });
  }

  //GUARDA LOS REGISTRO. QUE REGISTRAN O EDITA CON EXITO
  clientSave(): void {
    //validamos si es validos los datos
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    //EXTRAEMOS O CAPTURO SU VALOR DEL ID, QUE ES VALIDO
    const clientId = this.form.get("clientId").value;

    if (clientId > 0) {
      this.clientEdit(clientId);
    } else {
      this.clientRegister();
    }
  }

  clientRegister(): void {
    this._clientServices
      .clientRegisterServices(this.form.value)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
          this._dialogRef.close(true);
        } else {
          this._alert.warn("Atencion", resp.message);
        }
      });
  }

  clientEdit(clientId: number): void {
    this._clientServices
    .clientEditService(clientId, this.form.value)
    .subscribe((resp)=>{
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message)
        this._dialogRef.close(true);
      } else {
        this._alert.warn("Atencion", resp.message)
      }
    })
  }

  clientById(clientId: number): void {
    this._clientServices.clientByIdServices(clientId).subscribe((resp) => {
      //los datos del interfas para registrar
      this.form.reset({
        clientId: resp.clientId,
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
}
