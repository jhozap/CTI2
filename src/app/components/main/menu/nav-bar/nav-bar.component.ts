import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import { User } from 'src/app/models/user.class';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public user: string = "";
  public cargo: string = "";
  
  constructor(private _componentservice: ComponentsService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    debugger;
    let datosUser = atob(sessionStorage.getItem("user"));
    let values: User = JSON.parse(datosUser);
    this.user = values.NOMBRES + " " + values.APELLIDOS;
    let welcome = sessionStorage.getItem("welcome");
    if(welcome == "true") {
      this.toastr.success("Bienvenido " + values.DESC_GRADO + " - " + this.user + "/" + values.PERFIL);
      sessionStorage.setItem("welcome", "false");
    }
    
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
