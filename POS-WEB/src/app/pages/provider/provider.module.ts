import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderManageComponent } from './components/provider-manage/provider-manage.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';


@NgModule({
  declarations: [
    ProviderListComponent,
    ProviderManageComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    //IMPORTAMOS EL MODULO SHARED, PARA UTILIZAR CADA COMPONENTES DE DISEÑO
    SharedModule,
    //REUTILIZAMOS EL COMPONENTE DE LA TABLA
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent
  ]
})
export class ProviderModule { }
