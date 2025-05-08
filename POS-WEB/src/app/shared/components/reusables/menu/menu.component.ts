import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { IconModule } from "@visurel/iconify-angular";
import { MenuItems } from "@shared/models/menu-items.interface";
import { MatRippleModule } from "@angular/material/core";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, IconModule, MatRippleModule],
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  constructor() {}

  @Input() currentMenu: number;
  @Input() items: MenuItems[];
  @Input() buttonShow = false;
  @Input() buttonLabel = "Button";

  @Output() filterChange = new EventEmitter<unknown>();
  @Output() buttonClick = new EventEmitter<unknown>();

  activeItem: MenuItems["id"] = "all";

  ngOnInit(): void {
    //inicializamos el buscador por estado
    this.setCurrentFilter(this.currentMenu);
  }

  //identificamos loa activo o inactivos
  setCurrentFilter(itemNumber: number) {
    let currentItem = this.items.find((item) => item.value == itemNumber);
    this.activeItem = currentItem.id;
  }

  //buscamos por dato de la interfas "MenuItems" que enviamos y buscamos
  setFilter(item: MenuItems) {
    this.activeItem = item.id;
    return this.filterChange.emit(item.value);
  }

  //mostrar los elem activos
  isActive(item: MenuItems["id"]) {
    this.activeItem === item;
  }

  //accion de button
  emitClick() {
    if (this.buttonShow) {
      return this.buttonClick.emit();
    }
  }
}
