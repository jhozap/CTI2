import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
    FormGroup,
    Validators,
    FormBuilder
} from "@angular/forms";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { investigadores } from 'src/app/constants/mockData.class';

@Component({
    selector: "app-modal-investigador",
    templateUrl: "./modalInvestigador.component.html",
    styleUrls: ["./investigacion-institucional.component.scss"]
})
export class ModalInvestigador implements OnInit {

    public isLoading = false;
    public form: FormGroup;
    new = true;
    investigadoresSeleccionados = [];
    investigador: any;

    constructor(
        public dialogRef: MatDialogRef<ModalInvestigador>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            investigadorForm: []
        });
    }
    ngOnInit() {
        this.investigadoresSeleccionados = this.data.seleccionados;
        this.investigadoresSeleccionados.forEach(element => {
            this.data.investigadores = this.data.investigadores.filter(x=> x.ID_INVESTIGADOR != element.ID_INVESTIGADOR);
        });
    }

    agregarInvestigador(investigador){
        this.investigador = investigador;
    }


    onClose() {
        this.dialogRef.close();
    }

    guardar(){
        this.investigadoresSeleccionados.push(this.investigador);
        return this.investigadoresSeleccionados;
    }

}
