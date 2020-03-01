import { Component, OnInit, Input } from '@angular/core';
import { AutoCompleteData } from 'src/app/models/interfaces.class';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  filteredData: Observable<any>;
  dataControl = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit() {
 
  }

}
