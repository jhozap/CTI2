import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms'

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
     MatTableModule,
 
     ReactiveFormsModule,
     ToastrModule.forRoot()
  ]
})
export class LoginModule { }
