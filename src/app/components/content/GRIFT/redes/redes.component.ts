import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mybtn",
    cancelButton: "btn btn-danger mybtn"
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss']
})
export class RedesComponent implements OnInit {

  titleForm = "Redes de Investigacion";
  public new = false;

  displayedColumns: string[] = [
    "ID_RED",
    "NOMBRE_RED",
    "ENTIDAD",
    "ANO_CREACION",
    "SEDE_DEPTO",
    "SEDE_CIUDAD",
    "ACCIONES"
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.getRedes();
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
            this.titleForm = "Redes de Investigacion";
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    } else {
      this.titleForm = "Nueva Red de Investigacion";
      this.new = !this.new;
    }
  }

  getRedes() {
    this._dataService.getRedes()
      .subscribe((data: any[]) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }

  updateRed(e) {}
  deleteRed(e) {}

}
