import { Component, OnInit, Input } from '@angular/core';
import { AutoCompleteData } from 'src/app/models/interfaces.class';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  @Input()
  form: FormGroup;
  @Input()
  nombreCampo: any;


  filteredData: Observable<any>;
  
  constructor() {}

  ngOnInit() {
 
  }

}
