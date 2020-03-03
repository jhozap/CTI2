import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { FormControlService } from 'src/app/services/form-control.service';
import { colombia } from 'src/app/models/colombia';

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
  public colombia = colombia;
  ciudades = [];
  departamentoForm: any;
  ciudadForm: any;
  formulario: FormGroup;
    placeholders = ["Nombre de la red", "Entidad que la conforma", "Año de creación", "Sede de la red"];
    nombreForms = ["nombreRedForm", "entidadForm", "anioForm", "departamentoForm","ciudadForm"];



  constructor(private _dataService: DataService,
    private formBuilder: FormBuilder,
    private formGroup: FormControlService) {
      this.formulario = new FormGroup({
        nombreRedForm: new FormControl('', Validators.required),
        entidadForm: new FormControl('', Validators.required),
        anioForm: new FormControl('', Validators.required),
      
      });

      this.departamentoForm = new FormControl();
      this.ciudadForm = new FormControl();
    
  }

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

  departamentoSeleccionado(dpto) {
    console.log(dpto);
    this.colombia.filter(x=> x.id == dpto).forEach(element => {
     let x = element.ciudades;
    this.ciudades = x;
    });
    
  }

  seleccionarCiudad(ciudad){
    console.log(ciudad);
    
  }

}
