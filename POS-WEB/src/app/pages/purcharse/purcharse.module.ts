import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurcharseRoutingModule } from './purcharse-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { SelectAutocompleteComponent } from '@shared/components/reusables/select-autocomplete/select-autocomplete.component';
import { PurcharseListComponent } from './components/purcharse-list/purcharse-list.component';
import { PurcharseCreateComponent } from './components/purcharse-create/purcharse-create.component';


@NgModule({
  declarations: [
    PurcharseListComponent,
    PurcharseCreateComponent
  ],
  imports: [
    CommonModule,
    PurcharseRoutingModule,
    //IMPORTAMOS EL MODULO SHARED, PARA UTILIZAR CADA COMPONENTES DE DISEÑO
    SharedModule,
    //REUTILIZAMOS EL COMPONENTE DE LA TABLA
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    SelectAutocompleteComponent
  ]
})
export class PurcharseModule { }
