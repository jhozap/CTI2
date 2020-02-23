import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() placeholder: string;
  @Input() data: any[];
  @Input() icon: string;
  @Input() argument: string;
  @Output() formReady = new EventEmitter<FormControl>();
  dataControl = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
    this.formReady.emit(this.dataControl);
  }

}
