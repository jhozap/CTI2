import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AutoCompleteData } from 'src/app/models/interfaces.class';
import { FormControl, Validators } from '@angular/forms';
import * as constants from '../../../../constants/constants.class'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() data: AutoCompleteData;
  @Output() formReady = new EventEmitter<FormControl>();
  constantes = constants;
  filteredData: Observable<any>;
  dataControl = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
    this.formReady.emit(this.dataControl);
    this.filteredData = this.dataControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value[this.data.argument])),
      map(name => (name ? this._filter(name) : this.data.data.slice()))
    );
  }
  display(data): string | undefined {
    return data ? data[this.data.argument] : undefined;
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.data.data.filter(
      option => option[this.data.argument].toLowerCase().indexOf(filterValue) >= 0
    );
  }

}
