import { Component, OnInit, ViewChild } from '@angular/core';
import * as constants from '../../../../constants/constants.class';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from 'src/app/models/user.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['SIGLA_TIPO_DOCUMENTO', 'DOCUMENTO', 'NOMBRES', 'APELLIDOS', 'DESC_GRADO', 'SIGLA_UNIDAD', 'USUARIO', 'EMAIL', 'PERFIL', 'ACCIONES'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public constantes = constants;
  public new = false;
  public tableData = [];
  resultsLength = 0;

  titleForm: string = 'Usuarios';

  newUser = new FormGroup({});
  tipoDoc = [
    {ID_TIPO_DOCUMENTO: '1', DESCRIPCION: 'TARJETA DE IDENTIDAD'},
    {ID_TIPO_DOCUMENTO: '2', DESCRIPCION: 'CEDULA CIUDADANIA'},
    {ID_TIPO_DOCUMENTO: '3', DESCRIPCION: 'PASAPORTE'},
    {ID_TIPO_DOCUMENTO: '4', DESCRIPCION: 'CEDULA EXTRANJERIA'}
    ];

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.getUsers();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  closeTheForm() {
    if(this.new) {
      this.titleForm = 'Usuarios';
      this.getUsers();   
    } else {
      this.titleForm = 'Nuevo Usuario';
    }
    
    this.new = !this.new;
  }

  getUsers() {
    debugger;
    this._dataService.getUsers()
      .toPromise()
        .then((data: User[]) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          setTimeout(()=> {
            this.dataSource.paginator = this.paginator;
          }, 0);
        })
        .catch((error) => {
          console.log(error);
        });
  }
}