import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";

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
import { MatSidenavModule } from "@angular/material/sidenav";
import { ReactiveFormsModule } from "@angular/forms";
//#endregion Material

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
