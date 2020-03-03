import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

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


  constructor() { }

  ngOnInit(): void {
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

}
