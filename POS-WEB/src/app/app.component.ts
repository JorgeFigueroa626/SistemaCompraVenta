import { Component, Inject, LOCALE_ID, Renderer2 } from "@angular/core";
import { ConfigService } from "../@vex/services/config.service";
import { Settings } from "luxon";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { NavigationService } from "../@vex/services/navigation.service";

import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Style, StyleService } from "../@vex/services/style.service";
import { ConfigName } from "../@vex/interfaces/config-name.model";

import { IconsService } from "@shared/services/icons.service";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "vex";

  constructor(
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    this.configService.updateConfig({
      sidenav: {
        title: "POS",
        imageUrl: "/assets/img/demo/logo.svg",
        showCollapsePin: true,
      },
    });

    this.route.queryParamMap
      .pipe(
        map(
          (queryParamMap) =>
            queryParamMap.has("rtl") &&
            coerceBooleanProperty(queryParamMap.get("rtl"))
        )
      )
      .subscribe((isRtl) => {
        this.document.body.dir = isRtl ? "rtl" : "ltr";
        this.configService.updateConfig({
          rtl: isRtl,
        });
      });

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("layout")))
      .subscribe((queryParamMap) =>
        this.configService.setConfig(queryParamMap.get("layout") as ConfigName)
      );

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.styleService.setStyle(queryParamMap.get("style") as Style)
      );

    //////***CATEGORIA - PASO 10 */
    //////***PROVEEDOR - PASO 10 */
    //NAVEGACION DEL LINK DEL FRONTEND DE CADA PAGINA DE LOS MODULOS
    this.navigationService.items = [
      {
        type: "link",
        label: "Estadísticas",
        route: "estadisticas",
        icon: IconsService.prototype.getIcon("icDashboard"),
      },
      {
        type: "link",
        label: "Almacenes",
        route: "almacenes",
        icon: IconsService.prototype.getIcon("icWarehouse"),
      },
      {
        type: "link",
        label: "Clientes",
        route: "clientes",
        icon: IconsService.prototype.getIcon("icClient"),
      },
      {
        type: "dropdown",
        label: "Catálogo",
        icon: IconsService.prototype.getIcon("icManage"),
        children: [
          {
            type: "link",
            label: "Categorias",
            route: "categorias",
          },
          {
            type: "link",
            label: "Productos",
            route: "productos",
          },
        ]
      },
      {
        type: "dropdown",
        label: "Procesos",
        icon: IconsService.prototype.getIcon("icSales"),
        children: [
          {
            type: "link",
            label: "Proceso de Compras",
            route: "proceso-compras",
          },
          {
            type: "link",
            label: "Proceso de Ventas",
            route: "proceso-ventas",
          },
        ]
      },
      {
        type: "link",
        label: "Proveedores",
        route: "proveedores",
        icon: IconsService.prototype.getIcon("icProvider"),
      },
      {
        type: "link",
        label: "Usuarios",
        route: "usuarios",
        icon: IconsService.prototype.getIcon("icClient"),
      },
    ];

    //////SIGUE***CATEGORIA - PASO 11 */
    //DISEÑO DEL FRONTEND PARA PAGINA
  }
}
