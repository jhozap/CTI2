import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//#region Material
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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
import { SelectComponent } from './formsComponents/select/select.component';
import { TextComponent } from './formsComponents/text/text.component';
import { DateComponent } from './formsComponents/date/date.component';
import { NumberComponent } from './formsComponents/number/number.component';
import { EmailComponent } from './formsComponents/email/email.component';
import { MultiSelectComponent } from './formsComponents/multi-select/multi-select.component';
import { PasswordComponent } from './formsComponents/password/password.component';
import { MatNativeDateModule } from '@angular/material/core';

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
    SelectComponent,
    TextComponent,
    DateComponent,
    NumberComponent,
    EmailComponent,
    MultiSelectComponent,
    PasswordComponent,
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
    MatTableModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule, MatMomentDateModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),

    ToastrModule.forRoot()
  ],
  providers: [    
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule, MatMomentDateModule,
  ],
})
export class ContentModule {}
