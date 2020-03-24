import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
    FormGroup,
    Validators,
    FormBuilder
} from "@angular/forms";

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

    constructor(
        public dialogRef: MatDialogRef<ModalInvestigador>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            investigadorForm: [, [Validators.required]]
        });
    }
    ngOnInit() {

        console.log(this.data);

    }

    agregarInvestigador(investigador){
        console.log(investigador);
        
    }


    onClose() {
        this.dialogRef.close();
    }

}
