import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import Swal from "sweetalert2";
import { DataService } from "src/app/services/data.service";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { Investigador } from "src/app/models/interfaces.class";

export interface DialogData {
  animal: string;
  name: string;
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mybtn",
    cancelButton: "btn btn-danger mybtn"
  },
  buttonsStyling: false
});

@Component({
  selector: "app-investigacion-institucional",
  templateUrl: "./investigacion-institucional.component.html",
  styleUrls: ["./investigacion-institucional.component.scss"]
})
export class InvestigacionInstitucionalComponent implements OnInit {
  displayedColumns: string[] = ["position", "escuela", "nombre", "ticket", "Acciones"];

  public new = false;
  titleForm: string = "Investigación Institucional";

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  isOptional = false;
  direccionesDuena = [];
  encuestas = [];
  aplicas = ["Si", "No"];
  aplica = false;
  areas = [];
  lineas = [];
  
  detallesVisualizacion = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  tipoEvento = [];
  participaciones = [];

  estimulosVisualizacion = [false,false,false,false,false,false,false];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private _dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      tituloInvestigacionForm: ["", Validators.required],
      direccionDuenaForm: ["", Validators.required],
      encuestasForm: ["", Validators.required],
      aplicasForm: ["", Validators.required],
      aplicaForm: ["", Validators.required],
      areasForm: ["", Validators.required],
      lineasForm: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ""
    });

    this.fourFormGroup = this._formBuilder.group({
      autorForm: [""],
      cartillaForm: [""],
      prototipoForm: [""],
      manualesForm: [""],
      procedimientosForm: [""],
      instructivosForm: [""],
      nombreRevista: [""],
      nombreArticulo: [""],
      anio: [""],
      codigoISSN: [""],
      autorArticulo: [""],

      nombreLibro: [""],
      pagInicio: [""],
      pagFinal: [""],
      editorial: [""],
      fechaPublicacion: [""],
    });

    this.sixFormGroup  = this._formBuilder.group({
      tipoForm: [''],
      participacion: [''],
      fechaForm: [''],
      nacionalInternacional: [''],
      
    });
  }

  productoInvestigacionChange(valor, posicion) {
    console.log(valor.checked);
    this.detallesVisualizacion[posicion] = valor.checked;
  }

  estimulosChange(valor, posicion){
    this.estimulosVisualizacion[posicion] = valor.checked;
  }

  aplicaChange(valor) {
    if (valor.value === "Si") {
      this.aplica = true;
    } else {
      this.aplica = false;
    }
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
          this._dataService
            .deleteInvestigador(i.ID_INVESTIGADOR)
            .subscribe(data => {
              if (data[0].codigo > 0) {
                Swal.fire({
                  icon: "success",
                  title: "Investigador Eliminado Exitosamente",
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
            this.titleForm = "Investigación Institucional";
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    } else {
      this.titleForm = "Nueva Investigación Institucional";
      this.new = !this.new;
    }
  }

  view(e) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: "panda"
      }
    });
  }
}

@Component({
  selector: "dialog-data-example-dialog",
  templateUrl: "dialog-data-example-dialog.html"
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
