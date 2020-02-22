import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatSidenavModule } from "@angular/material/sidenav";

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

    ReactiveFormsModule
  ]
})
export class MainModule { }
