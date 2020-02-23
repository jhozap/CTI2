import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import * as constants from '../../../../constants/constants.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constantes = constants;

  constructor(private _componentservice: ComponentsService,
              private router: Router,) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();  
    // this.router.navigateByUrl("/login");
  }

}
