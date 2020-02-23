import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms'

//#region Material
import { MatCardModule,
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
 } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
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
export class LoginModule { }
