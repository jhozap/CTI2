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
  selector: 'app-new-investigadores',
  templateUrl: './new-investigadores.component.html',
  styleUrls: ['./new-investigadores.component.scss']
})
export class NewInvestigadoresComponent implements OnInit {

  displayedColumns: string[] = [
    "DOCUMENTO",
    "NOMBRES",
    "APELLIDOS",
    "DESC_GRADO",
    "EMAIL",
    "ACCIONES"
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public constantes = constants;
  public new = false;
  public tableData = [];
  resultsLength = 0;
  idInvestigador = 0;

  titleForm: string = "Investigadores";

  grado = [];
  estudiosAcademicos = [{ID_ESTUDIO_ACADEMICO: '1', DESCRIPCION: 'Bachiller'},
  {ID_ESTUDIO_ACADEMICO: '2', DESCRIPCION: 'Técnico'},
  {ID_ESTUDIO_ACADEMICO: '3', DESCRIPCION: 'Técnologo'},
  {ID_ESTUDIO_ACADEMICO: '4', DESCRIPCION: 'Pregrado'},
  {ID_ESTUDIO_ACADEMICO: '5', DESCRIPCION: 'Posgrados'},
  {ID_ESTUDIO_ACADEMICO: '6', DESCRIPCION: 'Otros'}];
  
  tipoDoc = [
    { ID_TIPO_DOCUMENTO: "1", DESCRIPCION: "TARJETA DE IDENTIDAD" },
    { ID_TIPO_DOCUMENTO: "2", DESCRIPCION: "CEDULA CIUDADANIA" },
    { ID_TIPO_DOCUMENTO: "3", DESCRIPCION: "PASAPORTE" },
    { ID_TIPO_DOCUMENTO: "4", DESCRIPCION: "CEDULA EXTRANJERIA" }
  ];
  
  tipoCategorizacion = ["Junior", "Asociado", "Senior", "Emerito"];

  formulario: FormGroup;
  placeholders = ["Documento", "Nombres", "Apellidos", "Teléfono", "Dirección","Email", "Grado", "Estudios Acádemicos",
"Tipo Documento"];
  nombreForms = ["cedulaForm", "NombreForm", "Apellidos", "telefonoForm", "direccionForm", "emailForm", "gradoForm", 
  "estudiosAcademicosForm", "tipoDocForm"];

  constructor(
    private _dataService: DataService,
    private formBuilder: FormBuilder,
    private formGroup: FormControlService) {
      this.formulario = new FormGroup({
        cedulaForm: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])),
        NombreForm: new FormControl('', Validators.required),
        Apellidos: new FormControl('', Validators.required),
        telefonoForm: new FormControl('',   Validators.compose([Validators.required, 
          Validators.pattern("^[0-9]*$"), Validators.maxLength(10)])),
          direccionForm: new FormControl('', Validators.required),
          // tipoDocForm: new FormControl('', Validators.required),
          emailForm: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
          ])
        ),
        gradoForm: new FormControl('', Validators.required),
        estudiosAcademicosForm: new FormControl('', Validators.required),
        OtrosForm: new FormControl(''),
        CategForm: new FormControl('', Validators.required),
        Tipo: new FormControl('', Validators.required),
        Investigador: new FormControl('', Validators.required),
        Estudiante: new FormControl('', Validators.required),
        });
    }

  ngOnInit(): void {
    this.getGrados();
    this.getInvestigadores();
    this.formulario.get('CategForm').setValue(false);
    this.formulario.get('Tipo').disable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getInvestigadores() {
    this._dataService
      .getInvestigadores()
      .toPromise()
      .then((data: any[]) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      })
      .catch(error => {
        console.log(error);
      });
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
            console.log("cancel aceptado");
            this.new = !this.new;
            this.titleForm = "Investigadores";
            
            this.formulario.reset();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    } else {
      this.titleForm = "Nuevo Investigador";
      this.new = !this.new;
    }
  }

  enableTipo(event){
    console.log(event);
    if (event) {
      this.formulario.get('Tipo').enable();
    } else {
      this.formulario.get('Tipo').disable();
    }
  }

  checkOthers(){
    if(this.formulario.get('estudiosAcademicosForm').value != null &&
    this.formulario.get('estudiosAcademicosForm').value != undefined){
      if(this.formulario.get('estudiosAcademicosForm').value.DESCRIPCION === 'Otros'){
        return true;
    } else {
      return false;
    }
    }else {
      return false;
    }
  }

  getGrados() {
    this._dataService
      .getGrados()
      .toPromise()
      .then((data: any[]) => {
        debugger;
        this.grado = data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  guardar() {
    debugger;
    console.log(JSON.stringify(this.formulario.value));
    const newInvestigador = this.formulario.value;
    const query = {
      ID_INVESTIGADOR: this.idInvestigador,
      ID_GRADO: newInvestigador.gradoForm.ID_GRADO,
      DESC_GRADO: newInvestigador.gradoForm.DESCRIPCION,
      DOCUMENTO: newInvestigador.cedulaForm,
      NOMBRES: newInvestigador.NombreForm,
      APELLIDOS: newInvestigador.Apellidos,
      EMAIL: newInvestigador.emailForm,
      TELEFONO: newInvestigador.telefonoForm,
      DIRECCION: newInvestigador.direccionForm,
      ESTUDIOS: this.checkOthers() ? newInvestigador.OtrosForm : newInvestigador.estudiosAcademicosForm.DESCRIPCION,
      CATEGORIZADO: newInvestigador.CategForm ? 1 : 0,
      CATEGORIZADO_VALOR: newInvestigador.Tipo,
      PROFESOR: newInvestigador.Investigador ? 1 : 0,
      ESTUDIANTE: newInvestigador.Estudiante ? 1 : 0
    };
    debugger;
    console.log(JSON.stringify(query));
    this._dataService.newInvestigador(query).subscribe(data => {
      if (data[0].codigo > 0) {
        Swal.fire({
          icon: "success",
          title: this.idInvestigador > 0 ? "Datos Actualizados Exitosamente" : "Investigador registrado Exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.new = !this.new;
        this.titleForm = "Investigadores";
        this.getInvestigadores();
        this.formulario.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: this.idInvestigador > 0 ? "error al actualizar los datos" : "error al registrar el investigador",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  updateInvestigador(i) {
    if (!this.new) {
      this.titleForm = "Actualizar Investigador";
      this.new = !this.new;
      this.idInvestigador = i.ID_INVESTIGADOR;
      this.formulario.get("cedulaForm").setValue(i.DOCUMENTO);
      this.formulario.get("NombreForm").setValue(i.NOMBRES);
      this.formulario.get("Apellidos").setValue(i.APELLIDOS);
      this.formulario.get("telefonoForm").setValue(i.TELEFONO);
      this.formulario.get("direccionForm").setValue(i.DIRECCION);
      this.formulario.get("emailForm").setValue(i.EMAIL);      
      this.formulario.get("CategForm").setValue(i.CATEGORIZADO == "1" ? true: false);
      if(i.CATEGORIZADO == "1") {
        this.enableTipo(true);
        this.formulario.get("Tipo").setValue(i.CATEGORIZADO_VALOR);  
      } else {
        this.enableTipo(false);
      }
      this.formulario.get("Investigador").setValue(i.PROFESOR == "1" ? true: false);
      this.formulario.get("Estudiante").setValue(i.ESTUDIANTE  == "1" ? true: false);
      this.formulario
        .get("gradoForm")
        .setValue(this.consultarGrado(i.ID_GRADO));
      this.formulario
        .get("estudiosAcademicosForm")
        .setValue(this.consultarEstudios(i.ESTUDIOS));
    }
  }

  consultarGrado(idGrado) {
    let grado = this.grado.find(x => x.ID_GRADO == idGrado);
    return grado;
  }

  consultarEstudios(desc) {
    let grado = this.estudiosAcademicos.find(x => x.DESCRIPCION == desc);
    return grado;
  }

  deleteInvestigador(i) {
    swalWithBootstrapButtons
      .fire({
        title: "Eliminar Usuario",
        text:
          "¿Esta seguro que desea eliminar el usuario " +
          i.NOMBRES +
          " " +
          i.APELLIDOS +
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

          this._dataService.deleteInvestigador(i.ID_INVESTIGADOR)
            .subscribe((data)=> {
              if (data[0].codigo > 0) {
                Swal.fire({
                  icon: "success",
                  title: "Investigador Eliminado Exitosamente" ,
                  showConfirmButton: false,
                  timer: 1500
                });                
              } else {
                Swal.fire({
                  icon: "error",
                  title: "error al eliminar el investigador",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            });

          Swal.fire({
            icon: "success",
            title: "Investigador eliminado correctamente",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 1500
          });
          this.getInvestigadores();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  }
}
