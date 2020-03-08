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
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  displayedColumns: string[] = [
    "ID_UNIDAD",
    "SIGLA",
    "DESCRIPCION",
    "ID_TIPO"
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public constantes = constants;
  public new = false;
  public tableData = [];
  resultsLength = 0;

  titleForm: string = "Unidades";


  tipo = [
    { ID_TIPO: "1", DESCRIPCION: "Escuela" },
    { ID_TIPO: "2", DESCRIPCION: "Dirección" },
    { ID_TIPO: "3", DESCRIPCION: "Oficina ASC" },
   
  ];

  formulario: FormGroup;
  placeholders = ["Sigla", "Descripción", "Tipo"];
    nombreForms = ["siglaForm", "descripcionForm", "tipoForm"];
  

    constructor(
      private _dataService: DataService,
      private formBuilder: FormBuilder,
      private formGroup: FormControlService) {
        this.formulario = new FormGroup({
          siglaForm: new FormControl('', Validators.required),
          descripcionForm: new FormControl('', Validators.required),
          tipoForm: new FormControl('', Validators.required),
          
          });
      }
  
  ngOnInit(): void {
    this.getUnidades();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUnidades() {
    this._dataService.getUnidades()
      .subscribe((data: any[]) => {
        debugger;
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
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
            this.titleForm = "Unidades";
            this.getUnidades();
            this.formulario.reset();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    } else {
      this.titleForm = "Nueva Unidad";
      this.new = !this.new;
    }
  }

  updateUnidad(e) {

  }

  deleteUnidad(e) {

  }

}
