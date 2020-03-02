import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  @Input()
  nombreCampo: any;

  @Input()
  form: FormGroup;

  @Input()
  placeHolder: any;

  constructor() { }

  ngOnInit(): void {
  }

}
