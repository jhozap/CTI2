import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//#region Material
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatRadioModule,
  MatChipsModule,
  MatStepperModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDividerModule,
  MatExpansionModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatPaginatorModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

import { ContentRoutingModule } from "./content-routing.module";
import { HomeComponent } from "./home/home.component";
import { CarouselComponent } from "./home/carousel/carousel.component";
import { CarouselItemComponent } from "./home/carousel/carousel-item/carousel-item.component";
import { InvestigacionInstitucionalComponent } from "./GRIFT/investigacion-institucional/investigacion-institucional.component";
import { InvestigacionImplementadaComponent } from "./GRIFT/investigacion-implementada/investigacion-implementada.component";
import { CasoEmblematicoComponent } from "./GRIFT/caso-emblematico/caso-emblematico.component";
import { SemillerosComponent } from "./GRIFT/semilleros/semilleros.component";
import { RedesComponent } from "./GRIFT/redes/redes.component";
import { GraficaProductoComponent } from "./GRIFT/grafica-producto/grafica-producto.component";
import { GraficaInvestigacionComponent } from "./GRIFT/grafica-investigacion/grafica-investigacion.component";
import { AdministracionComponent } from './administracion/administracion.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { NewInvestigadoresComponent } from './administracion/new-investigadores/new-investigadores.component';
import { UnidadesComponent } from './administracion/unidades/unidades.component';
import { AutocompleteComponent } from './commonComponents/autocomplete/autocomplete.component';
import { ChipAutocompleteComponent } from './commonComponents/chip-autocomplete/chip-autocomplete.component';
import { SelectComponent } from './commonComponents/select/select.component';
import { SimpleInputComponent } from './commonComponents/simple-input/simple-input.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CarouselItemComponent,
    InvestigacionInstitucionalComponent,
    InvestigacionImplementadaComponent,
    CasoEmblematicoComponent,
    SemillerosComponent,
    RedesComponent,
    GraficaProductoComponent,
    GraficaInvestigacionComponent,
    AdministracionComponent,
    UsuariosComponent,
    NewInvestigadoresComponent,
    UnidadesComponent,
    AutocompleteComponent,
    ChipAutocompleteComponent,
    SelectComponent,
    SimpleInputComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    // Angular Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatChipsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    MatStepperModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,

    ReactiveFormsModule,

    ToastrModule.forRoot()
  ]
})
export class ContentModule {}
