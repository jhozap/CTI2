import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public user: string = "";
  public cargo: string = "";
  
  constructor(private _componentservice: ComponentsService) { }

  ngOnInit(): void {
    debugger;
    let values = JSON.parse(sessionStorage.getItem("user"));
    this.user = values.NOMBRES + " " + values.APELLIDOS;
    this.cargo = values.DESC_GRADO;
    console.log(values);
    this._componentservice.user.subscribe(user => {     
      if (user) {
        this.user = user.NOMBRES + " " + user.APELLIDOS;
        this.cargo = user.DESC_GRADO;
      }
    });
  }

}
