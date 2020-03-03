import { Component, OnInit, ViewChild } from '@angular/core';
import * as constants from '../../../../constants/constants.class';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user.class';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormControlService } from 'src/app/services/form-control.service';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success mybtn',
    cancelButton: 'btn btn-danger mybtn'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['SIGLA_TIPO_DOCUMENTO', 'DOCUMENTO', 'NOMBRES', 'APELLIDOS', 'DESC_GRADO', 'SIGLA_UNIDAD', 'USUARIO', 'EMAIL', 'PERFIL', 'ACCIONES'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

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

    grado = [];
    unidad = [];

    formulario: FormGroup;
    placeholders = ["Número de Documento", "Nombres", "Apellidos", "Teléfono", "Email", "Grado", "Unidad"];
    nombreForms = ["numeroDocumento", "NombreForm", "Apellidos", "tipoDocForm", "telefonoForm", "emailForm", "gradoForm", "unidadForm"];


  constructor(private _dataService: DataService,
    private formBuilder: FormBuilder,
    private formGroup: FormControlService) {
      this.formulario = new FormGroup({
        numeroDocumento: new FormControl('', Validators.required),
        NombreForm: new FormControl('', Validators.required),
        Apellidos: new FormControl('', Validators.required),
        tipoDocForm: new FormControl('', Validators.required),
        telefonoForm: new FormControl('', Validators.required),
        emailForm: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
          ])
        ),
        gradoForm: new FormControl('', Validators.required),
        unidadForm: new FormControl('', Validators.required)
      });
   
  }

  ngOnInit(): void {
    this.getUsers();    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  closeTheForm() {

    if(this.new) {
      swalWithBootstrapButtons.fire({
        title: '¿Esta seguro que desea cancelar la creación del usuario?',
        text: "si acepta se perderan todos los datos ya diligenciados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.value) {
          console.log('cancel aceptado');
          this.new = !this.new;
          this.titleForm = 'Usuarios';
          this.getUsers();   
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {}
      })
    } else {
      this.titleForm = 'Nuevo Usuario';
      this.new = !this.new;
    }
    
    
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

  updateUser(user) {
    console.log("Update", user);
  }

  deleteUser(user: User) {
    console.log("delete", user);
    swalWithBootstrapButtons.fire({
      title: 'Eliminar Usuario',
      text: "¿Esta seguro que desea eliminar el usuario " + user.NOMBRES +  " " + user.APELLIDOS + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario eliminado correctamente',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 1500
        })
        this.getUsers();   
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {}
    })
  }
}