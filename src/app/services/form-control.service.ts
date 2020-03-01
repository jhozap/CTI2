import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(fields: any[]): any {
    let group: any = {};

    fields.forEach(field => {
      group[field.Nombre] = new FormControl(undefined, field.required ? Validators.required : null)
    });
    return new FormGroup(group);
  }
  
}
