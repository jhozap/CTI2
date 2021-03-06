import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalInvestigador } from '../components/content/GRIFT/investigacion-institucional/modalInvestigador.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openInvestigador(investigadores: any, seleccionados:any): Observable<any>{
    
    const dialogRef = this.dialog.open(ModalInvestigador, {
      data: {investigadores: investigadores, seleccionados: seleccionados},
      panelClass: ["proveedorEdit-modal"]
    });
    return dialogRef.afterClosed();
  }

}
