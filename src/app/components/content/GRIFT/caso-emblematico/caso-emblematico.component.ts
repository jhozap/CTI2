import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { FormControlService } from 'src/app/services/form-control.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mybtn",
    cancelButton: "btn btn-danger mybtn"
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-caso-emblematico',
  templateUrl: './caso-emblematico.component.html',
  styleUrls: ['./caso-emblematico.component.scss']
})
export class CasoEmblematicoComponent implements OnInit {
  titleForm = "Caso emblematico";
  public new = false;

  displayedColumns: string[] = [
    "ID_CASO",
    "NOMBRE_CASO",
    "LUGAR_AFECTACION",
    "ACTIVIDADES",
    "ACCIONES"
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  investigadores = ["a","b","c","d"];
  integrantesForm: any;
  formulario: FormGroup;
    placeholders = ["Nombre del Caso", "Integrantes", "Lugar de Afectación", "Actividades"];
    nombreForms = ["nombreCasoForm", "integrantesForm", "lugarForm", "actividadForm"];


  constructor( private _dataService: DataService,
    private formBuilder: FormBuilder,
    private formGroup: FormControlService) {
      this.formulario = new FormGroup({
        nombreCasoForm: new FormControl('', Validators.required),
      //  integrantesForm: new FormControl('', Validators.required),
        lugarForm: new FormControl('', Validators.required),
        actividadForm: new FormControl('', Validators.required),
      });
      this.integrantesForm = new FormControl();
  }

  ngOnInit(): void {
    this.getCasoEmblematico();
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
            console.log("cancel aceptado");
            this.new = !this.new;
            this.titleForm = "Caso emblematico";
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    } else {
      this.titleForm = "Nuevo Caso emblematico";
      this.new = !this.new;
    }
  }

  getCasoEmblematico() {
    this._dataService.getCasoEmblematico()
      .subscribe((data: any[])=> {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }

  updateCaso(e) {}

  deleteCaso(e) {}

}
