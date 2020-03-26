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
import { DialogService } from 'src/app/services/dialog.service';
import { investigadores } from 'src/app/constants/mockData.class';
import { paises } from 'src/app/models/paises';
import { colombia } from 'src/app/models/colombia';

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
  displayedColumnsIn: string[] = ["DOCUMENTO", "NOMBRES", "APELLIDOS", "DESC_GRADO", "EMAIL", "ACCIONES"];

  public new = false;
  titleForm: string = "Investigación Institucional";

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  sevenFormGroup: FormGroup;
  isOptional = false;
  direccionesDuena = [];
  escuelas = [];
  aplicas = ["Si", "No"];
  aplica = false;
  areas = [];
  lineas = [];
  lineasOriginal = [];
  investigadores = [];
  capacitacionSeleccionada : any;
  capacitaciones = ["Becas","Diplomado","Seminario","Curso"];
  paises = paises;
  ciudadesDpto = colombia;
  departamentos = colombia;
  ciudades = [];
  ciudadFiltro = [];
  nacional = false;
  
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

  paso7= [true,true,true,true,true,true,true,true];

  investigadoresSeleccionados = [];
  tipoEvento = [  
    { ID: "1", DESCRIPCION: "Seminario" },
    { ID: "2", DESCRIPCION: "Simposio" },
    { ID: "3", DESCRIPCION: "Foro" },
    { ID: "4", DESCRIPCION: "Panel" },
    { ID: "4", DESCRIPCION: "Conversatorio" },
    { ID: "4", DESCRIPCION: "Encuentro" }
  ];
  participaciones = [
    { ID: "1", DESCRIPCION: "Asistente" },
    { ID: "2", DESCRIPCION: "Ponente" },
    { ID: "3", DESCRIPCION: "Organizador" }
  ];

  estimulosVisualizacion = [false,false,false,false,false,false,false];
  dataSource: MatTableDataSource<any>;
  dataSourceInvestigadores: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private _dataService: DataService,
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {

    this.dataSourceInvestigadores = new MatTableDataSource();
    setTimeout(() => {
      this.dataSourceInvestigadores.paginator = this.paginator;
    }, 0);
    this.firstFormGroup = this._formBuilder.group({
      tituloInvestigacionForm: ["", Validators.required],
      direccionDuenaForm: ["", Validators.required],
      escuelasForm: ["", Validators.required],
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
      ciudadForm: [''],
      paisForm: [''],
      departamentoForm:[''],
      ciudadInternacionalForm: ['']
      
    });

    this.sevenFormGroup = this._formBuilder.group({
      desc1: [''],
      apor1: [''],
      desc2: [''],
      apor2: [''],
      desc3: [''],
      apor3: [''],
      desc4: [''],
      apor4: [''],
      total1: [''],
      desc5: [''],
      apor5: [''],
      desc6: [''],
      apor6: [''],
      total2: [''],
      desc7: [''],
      apor7: [''],
      total3: [''],
      desc8: [''],
      apor8: [''],
      total4: [''],
      total: [''],
    });

    this.desahibilitarTodo();
    this.getDirecciones();
    this.getEscuelas();
    this.getInvestigadores();
    this.getAreas();
    this.getAreasXLinea();
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
        this.investigadores = data;
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

  getDirecciones() {
    this._dataService.getDirecciones()
      .subscribe((data: [])=> {
        this.direccionesDuena = data;
      });
  }

  getEscuelas() {
    this._dataService.getEscuelas()
      .subscribe((data: [])=> {
        this.escuelas = data;
      });
  }

  getAreas() {
    this._dataService.getAreas()
      .subscribe((data: [])=> {
        this.areas = data;
      });
  }

  getAreasXLinea() {
    this._dataService.getAreasXLinea()
      .subscribe((data: [])=> {
        this.lineasOriginal = data;
      });
  }

  seleccionarCapacitacion(event){
    console.log(event.source.value);
   
  }

  mostrarLineas(event){
    
    console.log(event.source.value, event.source.selected);
   
    if(event.source.selected === false){
      this.lineas = this.lineas.filter(x=> x.AREA != event.source.value);
    } else {
      let linea = this.lineasOriginal.filter(x=>x.AREA == event.source.value);
      linea.forEach(element => {
        this.lineas.push(element);  
      });
      
      console.log(this.lineas);
      
    }
    
  }

  view(e) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialogService.openInvestigador(this.investigadores, this.investigadoresSeleccionados).subscribe(
      response => {
          console.log(response);
          if(response != null && response != undefined){
            this.investigadoresSeleccionados.push(response);
     
            this.dataSourceInvestigadores = new MatTableDataSource(this.investigadoresSeleccionados);
            setTimeout(() => {
              this.dataSourceInvestigadores.paginator = this.paginator;
            }, 0);
          }
     
        },
      error => {}
    );
  }

  eliminarInvestigador(investigador){
    this.investigadoresSeleccionados = this.investigadoresSeleccionados.filter(x=>x.ID_INVESTIGADOR != investigador.ID_INVESTIGADOR);
    this.dataSourceInvestigadores = new MatTableDataSource(this.investigadoresSeleccionados);
    setTimeout(() => {
      this.dataSourceInvestigadores.paginator = this.paginator;
    }, 0);
  }

  seleccionarPais(event){
    console.log(event.source.value);
   
  }

  seleccionarDepartamento(event){
    console.log(event.source.value);
    this.ciudades = [];
    this.ciudades = this.departamentos.find(x=>x.id === event.source.value).ciudades;
    console.log(this.ciudades);
    
  }

  seleccionarCiudad(event){
    console.log(event.source.value);
   
  }

  cambiarLugar(event){
    this.nacional = event.checked;
  }

  internacional(){
    if(this.nacional){
      return 'Internacional'
    } else {
      return 'Nacional'
    }
  }

  paso7Checked(event, posicion){
    if(event.source.checked){
      this.sevenFormGroup.get('desc'+posicion).enable();
      this.sevenFormGroup.get('apor'+posicion).enable();
    }
    else {
      this.sevenFormGroup.get('desc'+posicion).disable();
      this.sevenFormGroup.get('apor'+posicion).disable();
    }
    
  }

  sumarTotal1(cantidad){
   
    this.sevenFormGroup.get('total1').setValue(Number(this.sevenFormGroup.get('apor1').value)+
    Number(this.sevenFormGroup.get('apor2').value)+
    Number(this.sevenFormGroup.get('apor3').value)+
    Number(this.sevenFormGroup.get('apor4').value));
    this.sumarTotal();
  }

  sumarTotal2(cantidad){
   
    this.sevenFormGroup.get('total2').setValue(Number(this.sevenFormGroup.get('apor5').value)+
    Number(this.sevenFormGroup.get('apor6').value));
    this.sumarTotal();
  }

  sumar(){
   
    this.sumarTotal();
  }

  
  sumarTotal(){
   
    this.sevenFormGroup.get('total').setValue(
    Number(this.sevenFormGroup.get('apor7').value)+
    Number(this.sevenFormGroup.get('apor8').value)+
    Number(this.sevenFormGroup.get('total1').value)+
    Number(this.sevenFormGroup.get('total2').value));
    
  }

  desahibilitarTodo(){
    for (let i = 1; i < 9; i++) {
      this.sevenFormGroup.get('desc'+i).disable();
      this.sevenFormGroup.get('apor'+i).disable();
      
    }
    this.sevenFormGroup.get('total1').disable();
    this.sevenFormGroup.get('total2').disable();
    this.sevenFormGroup.get('total3').disable();
    this.sevenFormGroup.get('total4').disable();
    this.sevenFormGroup.get('total1').setValue(0);
    this.sevenFormGroup.get('total2').setValue(0);
    this.sevenFormGroup.get('total3').setValue(0);
    this.sevenFormGroup.get('total4').setValue(0);
    this.sevenFormGroup.get('total').disable();
    this.sevenFormGroup.get('total').setValue(0);
    this.sevenFormGroup.get('apor1').setValue(0);
    this.sevenFormGroup.get('apor2').setValue(0);
    this.sevenFormGroup.get('apor3').setValue(0);
    this.sevenFormGroup.get('apor4').setValue(0);
    this.sevenFormGroup.get('apor5').setValue(0);
    this.sevenFormGroup.get('apor6').setValue(0);
    this.sevenFormGroup.get('apor7').setValue(0);
    this.sevenFormGroup.get('apor8').setValue(0);
      
    
  }
}
