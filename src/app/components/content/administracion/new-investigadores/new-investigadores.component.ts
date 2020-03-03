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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public constantes = constants;
  public new = false;
  public tableData = [];
  resultsLength = 0;

  titleForm: string = "Usuarios";

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
  placeholders = ["Cédula de Ciudadanía", "Nombres", "Apellidos", "Teléfono", "Dirección","Email", "Grado", "Estudios Acádemicos",
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
          tipoDocForm: new FormControl('', Validators.required),
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
  }

  closeTheForm() {
    if (this.new) {
      swalWithBootstrapButtons
        .fire({
          title: "¿Esta seguro que desea cancelar la creación del usuario?",
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
      this.titleForm = "Nuevo Usuario";
      this.new = !this.new;
    }
  }

  enableTipo(event){


    
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
}
