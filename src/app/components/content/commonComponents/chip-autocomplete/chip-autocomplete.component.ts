import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AutoCompleteData } from 'src/app/models/interfaces.class';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chip-autocomplete',
  templateUrl: './chip-autocomplete.component.html',
  styleUrls: ['./chip-autocomplete.component.scss']
})
export class ChipAutocompleteComponent implements OnInit {
  @ViewChild('chipInput', { static: false }) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @Input() data: AutoCompleteData;
  @Output() formReady = new EventEmitter<FormControl>();
  filteredData: Observable<any>;
  dataControl = new FormControl('', Validators.required);
  chips: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() { }

  ngOnInit(): void {
    this.formReady.emit(this.dataControl);
    this.filteredData = this.dataControl.valueChanges.pipe(
      startWith(null),
      map((item: any | null) =>
        item ? this._filter(item.name) : this.data.data.slice()
      )
    );
  }

  display(data): string | undefined {
    return data ? data.name : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.data.data.filter(
      option => option ? option.name.toLowerCase().indexOf(filterValue) >= 0 : null
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.chips.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.dataControl.setValue(null);
    }
  }

  remove(value: string): void {
    const index = this.chips.indexOf(value);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
  }

}
