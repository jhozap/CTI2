import { Component, OnInit, ViewChild } from "@angular/core";
import * as constants from "../../../../constants/constants.class";
import { DataService } from "src/app/services/data.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { User } from "src/app/models/user.class";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { FormControlService } from "src/app/services/form-control.service";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mybtn",
    cancelButton: "btn btn-danger mybtn"
  },
  buttonsStyling: false
});

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss"]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    "SIGLA_TIPO_DOCUMENTO",
    "DOCUMENTO",
    "NOMBRES",
    "APELLIDOS",
    "DESC_GRADO",
    "SIGLA_UNIDAD",
    "USUARIO",
    "EMAIL",
    "PERFIL",
    "ACCIONES"
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public constantes = constants;
  public new = false;
  public tableData = [];
  resultsLength = 0;
  idUsuario = 0;

  titleForm: string = "Usuarios";

  newUser = new FormGroup({});
  tipoDoc = [
    { ID_TIPO_DOCUMENTO: "1", DESCRIPCION: "TARJETA DE IDENTIDAD" },
    { ID_TIPO_DOCUMENTO: "2", DESCRIPCION: "CEDULA CIUDADANIA" },
    { ID_TIPO_DOCUMENTO: "3", DESCRIPCION: "PASAPORTE" },
    { ID_TIPO_DOCUMENTO: "4", DESCRIPCION: "CEDULA EXTRANJERIA" }
  ];

  perfil = [
    { ID_TIPO_PERFIL: "1", DESCRIPCION: "Administrador" },
    { ID_TIPO_PERFIL: "2", DESCRIPCION: "Usuario" }
  ];

  grado = [];
  unidad = [];

  formulario: FormGroup;
  placeholders = [
    "Número de Documento",
    "Nombres",
    "Apellidos",
    "Teléfono",
    "Email",
    "Grado",
    "Unidad",
    "PSI",
    "Perfil",
    "Password"
  ];
  nombreForms = [
    "numeroDocumento",
    "NombreForm",
    "Apellidos",
    "tipoDocForm",
    "telefonoForm",
    "emailForm",
    "gradoForm",
    "unidadForm",
    "PSIForm",
    "perfilForm",
    "passwordForm"
  ];

  constructor(
    private _dataService: DataService,
    private formBuilder: FormBuilder,
    private formGroup: FormControlService
  ) {
    this.formulario = new FormGroup({
      numeroDocumento: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ),
      NombreForm: new FormControl("", Validators.required),
      Apellidos: new FormControl("", Validators.required),
      tipoDocForm: new FormControl("", Validators.required),
      telefonoForm: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(10)
        ])
      ),
      emailForm: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      gradoForm: new FormControl("", Validators.required),
      unidadForm: new FormControl("", Validators.required),
      PSIForm: new FormControl("", Validators.required),
      perfilForm: new FormControl("", Validators.required),
      passwordForm: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getGrados();
    this.getUnidades();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  closeTheForm() {
    if (this.new) {
      swalWithBootstrapButtons
        .fire({
          title: "¿Esta seguro que desea cancelar?",
          text: "si acepta se perderan todos los datos ya diligenciados",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
        .then(result => {
          if (result.value) {
            // console.log("cancel aceptado");
            this.new = !this.new;
            this.titleForm = "Usuarios";
            this.getUsers();
            this.formulario.reset();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    } else {
      this.titleForm = "Nuevo Usuario";
      this.idUsuario = 0;
      this.new = !this.new;
    }
  }

  getUsers() {
    this._dataService
      .getUsers()
      .toPromise()
      .then((data: User[]) => {
        // console.log(data);
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getGrados() {
    this._dataService
      .getGrados()
      .toPromise()
      .then((data: any[]) => {
        this.grado = data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUnidades() {
    this._dataService
      .getUnidades()
      .toPromise()
      .then((data: any[]) => {
        this.unidad = data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  guardar() {
    // console.log(this.formulario.value);
    const newUser = this.formulario.value;
    const query = {
      ID_USUARIO: this.idUsuario,
      ID_TIPO_DOCUMENTO: newUser.tipoDocForm.ID_TIPO_DOCUMENTO,
      DOCUMENTO: newUser.numeroDocumento,
      NOMBRES: newUser.NombreForm,
      APELLIDOS: newUser.Apellidos,
      ID_GRADO: newUser.gradoForm.ID_GRADO,
      ID_UNIDAD: newUser.unidadForm.ID_UNIDAD,
      EMAIL: newUser.emailForm,
      CONTRASENA: newUser.passwordForm,
      TELEFONO: newUser.telefonoForm,
      USUARIO: newUser.PSIForm,
      PERFIL: newUser.perfilForm.ID_TIPO_PERFIL
    };

    this._dataService.newUser(query).subscribe(data => {
      if (data[0].codigo > 0) {
        Swal.fire({
          icon: "success",
          title: this.idUsuario > 0 ? "Datos Actualizados Exitosamente" : "Usuario registrado Exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.new = !this.new;
        this.titleForm = "Usuarios";
        this.getUsers();
        this.formulario.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: this.idUsuario > 0 ? "error al actualizar los datos" : "error al registrar el usuario",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  updateUser(user: User) {
    // console.log("Update", user);
    if (!this.new) {
      this.titleForm = "Actualizar Usuario";
      this.new = !this.new;
      this.idUsuario = user.ID_USUARIO;
      this.formulario.get("numeroDocumento").setValue(user.DOCUMENTO);
      this.formulario.get("NombreForm").setValue(user.NOMBRES);
      this.formulario.get("Apellidos").setValue(user.APELLIDOS);
      this.formulario.get("telefonoForm").setValue(user.TELEFONO);
      this.formulario.get("emailForm").setValue(user.EMAIL);
      this.formulario.get("PSIForm").setValue(user.USUARIO);
      this.formulario.get("passwordForm").setValue(user.CONTRASENA);
      this.formulario
        .get("tipoDocForm")
        .setValue(this.consultarTipo(user.ID_TIPO_DOCUMENTO));
      this.formulario
        .get("gradoForm")
        .setValue(this.consultarGrado(user.ID_GRADO));
      this.formulario
        .get("unidadForm")
        .setValue(this.consultarUnidad(user.ID_UNIDAD));
      this.formulario
        .get("perfilForm")
        .setValue(this.consultarPerfil(user.PERFIL));
    }
  }

  consultarUnidad(idUnidad) {
    let unidad = this.unidad.find(x => x.ID_UNIDAD == idUnidad);
    return unidad;
  }

  consultarPerfil(idPerfil) {
    let perfil = this.perfil.find(x => x.ID_TIPO_PERFIL == idPerfil);
    return perfil;
  }

  consultarGrado(idGrado) {
    let grado = this.grado.find(x => x.ID_GRADO == idGrado);
    return grado;
  }

  consultarTipo(idTipoDocumento) {
    let tipo = this.tipoDoc.find(x => x.ID_TIPO_DOCUMENTO == idTipoDocumento);
    return tipo;
  }

  deleteUser(user: User) {
    // console.log("delete", user);
    swalWithBootstrapButtons
      .fire({
        title: "Eliminar Usuario",
        text:
          "¿Esta seguro que desea eliminar el usuario " +
          user.NOMBRES +
          " " +
          user.APELLIDOS +
          "?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      .then(result => {
        if (result.value) {

          this._dataService.deleteUser(user.ID_USUARIO)
            .subscribe((data)=> {
              if (data[0].codigo > 0) {
                Swal.fire({
                  icon: "success",
                  title: "Usuario Eliminado Exitosamente" ,
                  showConfirmButton: false,
                  timer: 1500
                });                
              } else {
                Swal.fire({
                  icon: "error",
                  title: "error al eliminar el usuario",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            });

          Swal.fire({
            icon: "success",
            title: "Usuario eliminado correctamente",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 1500
          });
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }
}
