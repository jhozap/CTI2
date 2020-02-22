import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import * as constants from '../../../../constants/constants.class';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constantes = constants;

  constructor(private _componentservice: ComponentsService) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();    
  }

}
