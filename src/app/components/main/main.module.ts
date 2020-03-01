import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatSidenavModule } from "@angular/material/sidenav";

//#region Material
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

import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { NavBarComponent } from './menu/nav-bar/nav-bar.component';
import { MenuTogglerComponent } from './menu/menu-toggler/menu-toggler.component';
import { UserMenuComponent } from './menu/user-menu/user-menu.component';
import { MainMenuItemComponent } from './menu/main-menu-item/main-menu-item.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    MainComponent,
    MainMenuComponent,
    NavBarComponent,
    MenuTogglerComponent,
    UserMenuComponent,
    MainMenuItemComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
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
    MatSidenavModule,
    MatTableModule,

    ReactiveFormsModule,

    ToastrModule.forRoot()
  ]
})
export class MainModule { }
