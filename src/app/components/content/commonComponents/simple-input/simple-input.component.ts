import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputData } from 'src/app/models/interfaces.class';
import { FormControl, Validators } from '@angular/forms';
import * as constants from '../../../../constants/constants.class'

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent implements OnInit {

  @Input() data: InputData;
  @Input() type;
  @Output() formReady = new EventEmitter<FormControl>();
  constantes = constants;
  formControl = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

}
