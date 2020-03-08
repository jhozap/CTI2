import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-investigacion-institucional',
  templateUrl: './investigacion-institucional.component.html',
  styleUrls: ['./investigacion-institucional.component.scss']
})
export class InvestigacionInstitucionalComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  direccionesDuena = [];
  encuestas = [];
  aplicas = ['Si', 'No']
  aplica = false;
  areas = [];
  lineas = [];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      tituloInvestigacionForm: ['', Validators.required],
      direccionDuenaForm: ['', Validators.required],
      encuestasForm: ['', Validators.required],
      aplicasForm: ['', Validators.required],
      aplicaForm: ['', Validators.required],
      areasForm: ['', Validators.required],
      lineasForm: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });


  }

  enableTipo(valor) {

  }

  aplicaChange(valor) {
    if (valor.value === 'Si') {
      this.aplica = true;
    } else {
      this.aplica = false;
    }
  }

}
