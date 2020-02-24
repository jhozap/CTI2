import { Component, OnInit, ViewChild } from '@angular/core';
import * as constants from '../../../../constants/constants.class';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['DOCUMENTO', 'NOMBRES', 'APELLIDOS', 'DESC_GRADO', 'SIGLA_UNIDAD', 'USUARIO', 'EMAIL', 'PERFIL'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  public constantes = constants;
  public new = false;
  public tableData = [];
  

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.getUsers();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  closeTheForm() {
    console.log(this.new)
    if(this.new) {
      this.getUsers();
    }
    this.new = !this.new;
  }

  getUsers() {
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