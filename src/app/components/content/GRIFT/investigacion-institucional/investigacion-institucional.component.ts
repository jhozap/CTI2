import { Presupuesto, Estimulos, Eventos } from './../../../../models/Investigacion-Institucional/InvInstitucional.model';
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
import { InvestigacionInstitucional, InformacionBase, AreaLineaa, Guia, Articulo, Autor, Libro, Estimulos, Eventos, Presupuesto } from 'src/app/models/investigacion.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { InvInstitucional, AreaLinea, Investigarores, Producto } from 'src/app/models/Investigacion-Institucional/InvInstitucional.model';

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
  fifthFormGroup: FormGroup;
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
  paso3valido = true;

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
  
  paso3Validacion = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];
  ciudadSeleccionada: any;
  verTotal = false;
  paso7= [true,true,true,true,true,true,true,true];
  capacitacionSeleccionadaCombo = false;
  valorCapacitacion = "";
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

  investigacion: InvestigacionInstitucional;

  invInstitucional: InvInstitucional;



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
      aplicaForm: ["", ],
      areasForm: ["", Validators.required],
      lineasForm: ["", Validators.required],
      dateForm: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ""
    });

    this.fourFormGroup = this._formBuilder.group({
      autorForm: [""],
      cartillaForm: [""],
      prototipoForm: [""],
      manualesForm: [""],
      dateForm2: [""],
      procedimientosForm: [""],
      instructivosForm: [""],
      nombreRevista: [""],
      nombreArticulo: [""],
      anio: [""],
      codigoISSN: [""],
      autorArticulo: [""],
      dateForm3: [""],
      nombreLibro: [""],
      pagInicio: [""],
      pagFinal: [""],
      editorial: [""],
      fechaPublicacion: [""],
    });

    this.fifthFormGroup = this._formBuilder.group({
      idCapacitacion: [''],
    });

    this.sixFormGroup  = this._formBuilder.group({
      tipoForm: ['', Validators.required],
      participacion: ['', Validators.required],
      fechaForm: ['', Validators.required],
      ciudadForm: [''],
      paisForm: [''],
      departamentoForm:[''],
      ciudadInternacionalForm: ['']

    });

    this.sixFormGroup.controls["ciudadInternacionalForm"].setValidators([]);
    this.sixFormGroup.controls["paisForm"].setValidators([]);
    this.sixFormGroup.controls["departamentoForm"].setValidators([Validators.required]);
    this.sixFormGroup.controls["ciudadForm"].setValidators([Validators.required]);

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

    if(posicion==0 && valor.checked){
      this.fourFormGroup.controls["autorForm"].setValidators([Validators.required]);
    }
    if(posicion==0 && !valor.checked){
      this.fourFormGroup.controls["autorForm"].setValidators([]);
    }
    if(posicion==1 && valor.checked){
      this.fourFormGroup.controls["cartillaForm"].setValidators([Validators.required]);
    }
    if(posicion==1 && !valor.checked){
      this.fourFormGroup.controls["cartillaForm"].setValidators([]);
    }
    if(posicion==2 && valor.checked){
      this.fourFormGroup.controls["prototipoForm"].setValidators([Validators.required]);
    }
    if(posicion==2 && !valor.checked){
      this.fourFormGroup.controls["prototipoForm"].setValidators([]);
    }
    if(posicion==3 && valor.checked){
      this.fourFormGroup.controls["nombreRevista"].setValidators([Validators.required]);
      this.fourFormGroup.controls["nombreArticulo"].setValidators([Validators.required]);
      this.fourFormGroup.controls["dateForm2"].setValidators([Validators.required]);
      this.fourFormGroup.controls["codigoISSN"].setValidators([Validators.required]);
      this.fourFormGroup.controls["autorArticulo"].setValidators([Validators.required]);
    }
    if(posicion==3 && !valor.checked){
      this.fourFormGroup.controls["nombreRevista"].setValidators([]);
      this.fourFormGroup.controls["nombreArticulo"].setValidators([]);
      this.fourFormGroup.controls["dateForm2"].setValidators([]);
      this.fourFormGroup.controls["codigoISSN"].setValidators([]);
      this.fourFormGroup.controls["autorArticulo"].setValidators([]);
    }
    if(posicion==4 && valor.checked){
      this.fourFormGroup.controls["nombreLibro"].setValidators([Validators.required]);
      this.fourFormGroup.controls["pagInicio"].setValidators([Validators.required]);
      this.fourFormGroup.controls["pagFinal"].setValidators([Validators.required]);
      this.fourFormGroup.controls["editorial"].setValidators([Validators.required]);
      this.fourFormGroup.controls["dateForm3"].setValidators([Validators.required]);
    }
    if(posicion==4 && !valor.checked){
      this.fourFormGroup.controls["nombreLibro"].setValidators([]);
      this.fourFormGroup.controls["pagInicio"].setValidators([]);
      this.fourFormGroup.controls["pagFinal"].setValidators([]);
      this.fourFormGroup.controls["editorial"].setValidators([]);
      this.fourFormGroup.controls["dateForm3"].setValidators([]);
    }
    if(posicion==5 && valor.checked){
      this.fourFormGroup.controls["manualesForm"].setValidators([Validators.required]);
    }
    if(posicion==5 && !valor.checked){
      this.fourFormGroup.controls["manualesForm"].setValidators([]);
    }
    if(posicion==6 && valor.checked){
      this.fourFormGroup.controls["procedimientosForm"].setValidators([Validators.required]);
    }
    if(posicion==6 && !valor.checked){
      this.fourFormGroup.controls["procedimientosForm"].setValidators([]);
    }
    if(posicion==7 && valor.checked){
      this.fourFormGroup.controls["instructivosForm"].setValidators([Validators.required]);
    }
    if(posicion==7 && !valor.checked){
      this.fourFormGroup.controls["instructivosForm"].setValidators([]);
    }

    this.validarCheck(valor.checked, posicion);

  }

  estimulosChange(valor, posicion){
    this.estimulosVisualizacion[posicion] = valor.checked;
    if(this.estimulosVisualizacion.filter(x=>x == true).length>0){
      this.capacitacionSeleccionadaCombo = true;
    } else{
      this.capacitacionSeleccionadaCombo = false;
    }
    if(posicion==6){
      this.capacitacionSeleccionadaCombo = false;
    }
  }

  aplicaChange(valor) {
    if (valor.value === "Si") {
      this.aplica = true;
      this.firstFormGroup.controls["aplicaForm"].setValidators([Validators.required]);
    } else {
      this.aplica = false;
      this.firstFormGroup.controls["aplicaForm"].setValidators([]);
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
    this.valorCapacitacion = event.source.value;
    if(this.estimulosVisualizacion.filter(x=>x == true).length>0){
      this.capacitacionSeleccionadaCombo = true;
    } else{
      this.capacitacionSeleccionadaCombo = false;
    }


  }

  mostrarLineas(event){

    console.log(event.source.value, event.source.selected);

    if(event.source.selected === false){
      this.lineas = this.lineas.filter(x=> x.AREA != event.source.value.ID_AREA);
    } else {
      let linea = this.lineasOriginal.filter(x=>x.AREA == event.source.value.ID_AREA);
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
    this.ciudadSeleccionada = event.source.value;
  }

  cambiarLugar(event){
    this.nacional = event.checked;
    console.log(event.checked);


    if(this.nacional){

      this.sixFormGroup.controls["departamentoForm"].setValidators([]);
      this.sixFormGroup.controls["ciudadForm"].setValidators([]);
      this.sixFormGroup.get("departamentoForm").setValue('');
      this.sixFormGroup.get("ciudadForm").setValue('');
      this.sixFormGroup.controls["paisForm"].setValidators([Validators.required]);
      this.sixFormGroup.controls["ciudadInternacionalForm"].setValidators([Validators.required]);
    }else{
      this.sixFormGroup.controls["ciudadInternacionalForm"].setValidators([]);
      this.sixFormGroup.controls["paisForm"].setValidators([]);
      this.sixFormGroup.get("ciudadInternacionalForm").setValue('');
      this.sixFormGroup.get("paisForm").setValue('');
      this.sixFormGroup.controls["departamentoForm"].setValidators([Validators.required]);
      this.sixFormGroup.controls["ciudadForm"].setValidators([Validators.required]);
    }
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

    if(Number(this.sevenFormGroup.get('total').value)>0){
      this.verTotal = true;
    }else{
      this.verTotal = false;
    }
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

  validarCheck(valor,posicion){
  
    if(valor){
      this.paso3Validacion[posicion] = true;
    } else {
      this.paso3Validacion[posicion] = false;
    }
    console.log(this.paso3Validacion.filter(x => x === true));
    
    if(this.paso3Validacion.filter(x=> x === true).length>0){
      this.paso3valido = !true;
    }else{
      this.paso3valido = true;
    }
  }

  validarPaso3(){
    if(this.detallesVisualizacion.filter(x=>x == true).length>0){
      return true;
    }else{
      return false;
    }
  }


  construirDTO(){

    
    this.investigacion = new InvestigacionInstitucional();
    let informacionBase = new InformacionBase();
    informacionBase.tituloInvestigacion = this.firstFormGroup.get('tituloInvestigacionForm').value;
    informacionBase.escuelas = this.firstFormGroup.get('escuelasForm').value;
    informacionBase.entidadesExternas = this.firstFormGroup.get('aplicaForm').value;
    informacionBase.direccionDuena = this.firstFormGroup.get('direccionDuenaForm').value;
    informacionBase.anio = this.firstFormGroup.get('dateForm').value;

    let areaLineass = new Array<AreaLineaa>();
       this.firstFormGroup.get('areasForm').value.forEach(element => {
       
      let linea = this.firstFormGroup.get('lineasForm').value.filter(x => x.AREA == element.ID_AREA);
      linea.forEach(lineaSeleccion => {
        let  area = new  AreaLineaa(); 
        area.idArea = element.ID_AREA;
        area.idLinea = lineaSeleccion.LINEA;;
        areaLineass.push(area);
      });  
    });
    informacionBase.areaLinea = areaLineass;

    debugger;

    let guia = new Guia();
    guia.check = this.detallesVisualizacion[0];
    guia.autor = this.fourFormGroup.get('autorForm').value;

    let articulo = new Articulo();
    articulo.check = this.detallesVisualizacion[3];
    articulo.anio = this.fourFormGroup.get('dateForm2').value;
    articulo.autor = this.fourFormGroup.get('autorArticulo').value;
    articulo.codigoISSN = this.fourFormGroup.get('codigoISSN').value;
    articulo.nombreArticulo = this.fourFormGroup.get('nombreArticulo').value;
    articulo.nombreRevista = this.fourFormGroup.get('nombreRevista').value;

    let manuales = new Autor();
    manuales.check = this.detallesVisualizacion[5];
    manuales.autor = this.fourFormGroup.get('manualesForm').value;

    let cartilla = new Autor();
    cartilla.autor = this.fourFormGroup.get('cartillaForm').value;
    cartilla.check = this.detallesVisualizacion[1];

    let procedimientos = new Autor();
    procedimientos.check = this.detallesVisualizacion[6];
    procedimientos.autor = this.fourFormGroup.get('procedimientosForm').value;

    let prototipo = new Autor();
    prototipo.autor = this.fourFormGroup.get('prototipoForm').value;
    prototipo.check = this.detallesVisualizacion[2];

    let instructivos = new Autor();
    instructivos.check = this.detallesVisualizacion[7];
    instructivos.autor = this.fourFormGroup.get('instructivosForm').value;

    let libro = new Libro();
    libro.checkCapLibro = this.detallesVisualizacion[4];
    libro.checkLibro = this.detallesVisualizacion[4];
    libro.editorial = this.fourFormGroup.get('editorial').value;
    libro.fechaPublicacion = this.fourFormGroup.get('dateForm3').value;
    libro.nombreLibro = this.fourFormGroup.get('nombreLibro').value;
    libro.paginaFinal = this.fourFormGroup.get('pagFinal').value;
    libro.paginaLibro = this.fourFormGroup.get('pagInicio').value;

    // let estimulos = new Estimulos();
    // estimulos.capacitaciones = this.estimulosVisualizacion[6];
    // estimulos.condecoraciones = this.estimulosVisualizacion[0];
    // estimulos.estatuillas = this.estimulosVisualizacion[4];
    // estimulos.felicitaciones = this.estimulosVisualizacion[1];
    // estimulos.idCapacitacion = this.fifthFormGroup.get('idCapacitacion').value;
    // estimulos.monedas = this.estimulosVisualizacion[5];
    // estimulos.permiso = this.estimulosVisualizacion[3];
    // estimulos.personajeMes = this.estimulosVisualizacion[2];

    // let eventos = new Eventos();
    // eventos.pais = this.sixFormGroup.get('paisForm').value;
    // eventos.ciudad = this.sixFormGroup.get('ciudadInternacionalForm').value;
    // eventos.esNacional = !this.nacional;
    // eventos.fecha = this.sixFormGroup.get('fechaForm').value;
    // eventos.participacion = this.sixFormGroup.get('participacion').value;
    // eventos.tipo = this.sixFormGroup.get('tipoForm').value;
    // eventos.ciudadDpto = this.sixFormGroup.get('ciudadForm').value;
    // eventos.departamento = this.sixFormGroup.get('departamentoForm').value;

    // let convocatoriaColciencias = new Presupuesto();
    // convocatoriaColciencias.aporte = this.sevenFormGroup.get('apor1').value;
    // convocatoriaColciencias.descripcion = this.sevenFormGroup.get('desc1').value;
    // let ministerios = new Presupuesto();
    // ministerios.descripcion = this.sevenFormGroup.get('desc2').value;
    // ministerios.aporte = this.sevenFormGroup.get('apor2').value;
    // let entesInternacionales = new Presupuesto();
    // entesInternacionales.aporte = this.sevenFormGroup.get('apor3').value;
    // entesInternacionales.descripcion = this.sevenFormGroup.get('desc3').value;
    // let otrasInstituciones = new Presupuesto();
    // otrasInstituciones.descripcion = this.sevenFormGroup.get('desc4').value;
    // otrasInstituciones.aporte = this.sevenFormGroup.get('apor4').value;
    // let rubroPresupuestal = new Presupuesto();
    // rubroPresupuestal.descripcion = this.sevenFormGroup.get('desc5').value;
    // rubroPresupuestal.aporte = this.sevenFormGroup.get('apor5').value;
    // let convocatorioInterna = new Presupuesto();
    // convocatorioInterna.descripcion = this.sevenFormGroup.get('desc6').value;
    // convocatorioInterna.aporte = this.sevenFormGroup.get('apor6').value;
    // let conveniosExternos = new Presupuesto();
    // conveniosExternos.descripcion = this.sevenFormGroup.get('desc7').value;
    // conveniosExternos.aporte = this.sevenFormGroup.get('apor7').value;
    // let presupuestoPersonal = new Presupuesto();
    // presupuestoPersonal.descripcion = this.sevenFormGroup.get('desc8').value;
    // presupuestoPersonal.aporte = this.sevenFormGroup.get('apor8').value;

    // this.investigacion.informacionBase = informacionBase;
    // this.investigacion.investigadores = this.investigadoresSeleccionados;
    // this.investigacion.guia = guia;
    // this.investigacion.articulo  = articulo;
    // this.investigacion.manuales = manuales;
    // this.investigacion.cartilla = cartilla;
    // this.investigacion.procedimientos = procedimientos;
    // this.investigacion.prototipo = prototipo;
    // this.investigacion.instructivos = instructivos;
    // this.investigacion.libro = libro;
    // this.investigacion.estimulos = estimulos;
    // this.investigacion.eventos = eventos;
    // this.investigacion.convocatoriaColciencias = convocatoriaColciencias;
    // this.investigacion.ministerios = ministerios;
    // this.investigacion.entesInternacionales = entesInternacionales;
    // this.investigacion.otrasInstituciones = otrasInstituciones;
    // this.investigacion.rubroPresupuestal = rubroPresupuestal;
    // this.investigacion.convocatorioInterna = convocatorioInterna;
    // this.investigacion.conveniosExternos = conveniosExternos;
    // this.investigacion.presupuestoPersonal = presupuestoPersonal;



    // Armado de objeto API
    // Info Base
    this.invInstitucional = new InvInstitucional();
    this.invInstitucional.IdInvestigacion = "0";
    this.invInstitucional.Titulo = this.firstFormGroup.get('tituloInvestigacionForm').value;
    this.invInstitucional.Direccion = this.firstFormGroup.get('direccionDuenaForm').value;
    let anio = this.firstFormGroup.get('dateForm').value.toArray();
    this.invInstitucional.Anio =  anio[2] + '/' + Number(anio[1] + 1) + '/' + anio[0];
    this.aplica ? this.invInstitucional.Participacion = 'SI' : this.invInstitucional.Participacion = 'NO';
    this.aplica ? this.invInstitucional.ExParticipa = this.firstFormGroup.controls.aplicaForm.value : null ;
    // this.invInstitucional.Participacion = this.firstFormGroup.get('aplicaForm').value;
    this.invInstitucional.ExParticipa = "";
    this.invInstitucional.Escuela = this.firstFormGroup.get('escuelasForm').value;
    this.invInstitucional.Estado = 1;

    //Area Linea

    let areaLineas = new Array<AreaLinea>();
       this.firstFormGroup.get('areasForm').value.forEach(element => {
       
      let linea = this.firstFormGroup.get('lineasForm').value.filter(x => x.AREA == element.ID_AREA);
      linea.forEach(lineaSeleccion => {
      
        let  area = new  AreaLinea(); 
        area.IdArea = element.ID_AREA;
        area.IdLinea = lineaSeleccion.LINEA;;
        area.IdInvestigacion = '0';
        areaLineas.push(area);
      });  
    });

    this.invInstitucional.AreaLinea = areaLineas;

    //Investigadores

    let investigadoresSelected = new Array<Investigarores>();
    this.investigadoresSeleccionados.forEach(element => {
      let inv = new Investigarores();
      inv.IdInvestigador = element.ID_INVESTIGADOR;
      inv.IdInvestigacion = '0';
      investigadoresSelected.push(inv);
    });

    this.invInstitucional.Investigadores = investigadoresSelected;

    //Producto
    debugger;
    let productos = new Array<Producto>();     
    var self = this;
    this.detallesVisualizacion.forEach(function(element, i) {
      if (element) {
        let product = new Producto();
        product.IdInvestigacion = '0';
        switch(i) {
          case 0: {
            product.TipoProducto = "Guia";
            product.Autor = self.fourFormGroup.get('autorForm').value;
            product.NombreRevista = "";
            product.NombreArticulo = "";
            product.Anio = 0;
            product.CodigoISSN = "";
            product.NombreLibro = "";
            product.PaginaInicio = 0;
            product.PaginaFinal = 0;
            product.Editorial = "";
            product.FechaPublicacion = "";
            break;
          }
          case 1: {
            product.TipoProducto = "Cartilla";
            product.Autor = self.fourFormGroup.get('cartillaForm').value;
            product.NombreRevista = "";
            product.NombreArticulo = "";
            product.Anio = 0;
            product.CodigoISSN = "";
            product.NombreLibro = "";
            product.PaginaInicio = 0;
            product.PaginaFinal = 0;
            product.Editorial = "";
            product.FechaPublicacion = "";
            break;
          }
          case 2: {
            product.TipoProducto = "Prototipo";
            product.Autor = self.fourFormGroup.get('prototipoForm').value;
            product.NombreRevista = "";
            product.NombreArticulo = "";
            product.Anio = 0;
            product.CodigoISSN = "";
            product.NombreLibro = "";
            product.PaginaInicio = 0;
            product.PaginaFinal = 0;
            product.Editorial = "";
            product.FechaPublicacion = "";
            break;
          }
          case 3: {
            product.TipoProducto = "Articulo";
            product.Autor = self.fourFormGroup.get('autorArticulo').value;
            product.NombreRevista = self.fourFormGroup.get('nombreRevista').value;
            product.NombreArticulo = self.fourFormGroup.get('nombreArticulo').value;
            product.Anio = self.fourFormGroup.get('dateForm2').value;;
            product.CodigoISSN = self.fourFormGroup.get('codigoISSN').value;
            product.NombreLibro = "";
            product.PaginaInicio = 0;
            product.PaginaFinal = 0;
            product.Editorial = "";
            product.FechaPublicacion = "";
            break;
          }
          case 4: {
            product.TipoProducto = "Libro";
            product.Autor = ""
            product.NombreRevista = "";
            product.NombreArticulo = "";
            product.Anio = 0;
            product.CodigoISSN = "";
            product.NombreLibro = self.fourFormGroup.get('nombreLibro').value;
            product.PaginaInicio = self.fourFormGroup.get('pagInicio').value;
            product.PaginaFinal = self.fourFormGroup.get('pagFinal').value;
            product.Editorial = self.fourFormGroup.get('editorial').value;
            product.FechaPublicacion = self.fourFormGroup.get('dateForm3').value;
            break;
          }
          case 5: {
            product.TipoProducto = "Manuales";
            product.Autor = self.fourFormGroup.get('manualesForm').value;
            product.NombreRevista = "";
            product.NombreArticulo = "";
            product.Anio = 0;
            product.CodigoISSN = "";
            product.NombreLibro = "";
            product.PaginaInicio = 0;
            product.PaginaFinal = 0;
            product.Editorial = "";
            product.FechaPublicacion = "";
            break;
          }
          case 6: {
            product.TipoProducto = "Procedimientos";
            product.Autor = self.fourFormGroup.get('procedimientosForm').value;
            product.NombreRevista = "";
            product.NombreArticulo = "";
            product.Anio = 0;
            product.CodigoISSN = "";
            product.NombreLibro = "";
            product.PaginaInicio = 0;
            product.PaginaFinal = 0;
            product.Editorial = "";
            product.FechaPublicacion = "";
            break;
          }
          case 7: {
            product.TipoProducto = "Instructivos";
            product.Autor = self.fourFormGroup.get('instructivosForm').value;
            product.NombreRevista = "";
            product.NombreArticulo = "";
            product.Anio = 0;
            product.CodigoISSN = "";
            product.NombreLibro = "";
            product.PaginaInicio = 0;
            product.PaginaFinal = 0;
            product.Editorial = "";
            product.FechaPublicacion = "";
            break;
          }
        }
      productos.push(product);
      }
    });

    this.invInstitucional.Producto = productos;
    // 5 Estimulos 

    this.invInstitucional.Estimulos = new Estimulos();
    this.invInstitucional.Estimulos.IdInvestigacion = '0';
    this.estimulosVisualizacion[0] ? this.invInstitucional.Estimulos.Condecoraciones = 1 : this.invInstitucional.Estimulos.Condecoraciones = 0; //condecoraciones
    this.estimulosVisualizacion[1] ? this.invInstitucional.Estimulos.Felicitaciones = 1 : this.invInstitucional.Estimulos.Felicitaciones = 0; //felicitaciones
    this.estimulosVisualizacion[2] ? this.invInstitucional.Estimulos.PersonajeMes = 1 : this.invInstitucional.Estimulos.PersonajeMes = 0; //personajeMes
    this.estimulosVisualizacion[3] ? this.invInstitucional.Estimulos.Permiso = 1 : this.invInstitucional.Estimulos.Permiso = 0; //permiso
    this.estimulosVisualizacion[4] ? this.invInstitucional.Estimulos.Estatuillas = 1 : this.invInstitucional.Estimulos.Estatuillas = 0; //estatuillas
    this.estimulosVisualizacion[5] ? this.invInstitucional.Estimulos.Monedas = 1: this.invInstitucional.Estimulos.Monedas = 0; //monedas
    this.estimulosVisualizacion[6] ? this.invInstitucional.Estimulos.Capacitaciones = 1  : this.invInstitucional.Estimulos.Capacitaciones = 0; //capacitaciones
    //this.estimulosVisualizacion[6] ? this.invInstitucional.Estimulos.idCapacitacion =  this.valorCapacitacion : null ;
    

    // 6 Eventos

    this.invInstitucional.Eventos = new Eventos();
    this.invInstitucional.Eventos.IdInvestigacion = '0';
    this.sixFormGroup.controls.tipoForm.value.ID > 0 ?  this.invInstitucional.Eventos.Tipo = this.sixFormGroup.controls.tipoForm.value.ID : null;
    this.sixFormGroup.controls.participacion.value.ID > 0 ?  this.invInstitucional.Eventos.Participacion = this.sixFormGroup.controls.participacion.value.ID : null;
    let fecha  = this.sixFormGroup.controls.fechaForm.value.toArray();
    this.sixFormGroup.controls.fechaForm.value ?  this.invInstitucional.Eventos.Fecha = fecha[2] + '/' + Number(fecha[1]+1) + '/' + fecha[0] : null;  
    this.sixFormGroup.controls.ciudadForm.value ?  this.invInstitucional.Eventos.DescSubRegion = this.sixFormGroup.controls.ciudadForm.value : null;
    this.sixFormGroup.controls.departamentoForm.value ?  this.invInstitucional.Eventos.DescRegion = this.sixFormGroup.controls.departamentoForm.value : null;
    this.sixFormGroup.controls.ciudadInternacionalForm.value ?  this.invInstitucional.Eventos.DescSubRegion = this.sixFormGroup.controls.ciudadInternacionalForm.value : null;
    this.sixFormGroup.controls.paisForm.value ?  this.invInstitucional.Eventos.Pais = this.sixFormGroup.controls.paisForm.value : null;    
    this.nacional ? this.invInstitucional.Eventos.esNacional  = true : this.invInstitucional.Eventos.esNacional = false ;

    // 7 Presupuesto  Asignado
    let presupuestos = new Array<Presupuesto>();

    if (this.sevenFormGroup.controls.desc1.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Convocatoria Colciencias';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc1.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor1.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    if (this.sevenFormGroup.controls.desc2.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Ministerios';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc2.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor2.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    if (this.sevenFormGroup.controls.desc3.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Entes Internacionales';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc3.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor3.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    if (this.sevenFormGroup.controls.desc4.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Otras Instituciones';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc4.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor4.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    if (this.sevenFormGroup.controls.desc5.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Rubro Presupuestal (OFPLA)';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc5.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor5.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    if (this.sevenFormGroup.controls.desc6.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Convocatoria Interna (DINAE)';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc6.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor6.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    if (this.sevenFormGroup.controls.desc7.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Convenios Externos';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc7.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor7.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    if (this.sevenFormGroup.controls.desc8.value != '' ) {
      let presupuesto = new Presupuesto();  
      presupuesto.NombrePresupuesto = 'Presupuesto  Personal(Investigadores)';
      presupuesto.DescPresupuesto = this.sevenFormGroup.controls.desc8.value;
      presupuesto.Aporte = this.sevenFormGroup.controls.apor8.value;
      presupuesto.IdInvestigacion = '0';
      presupuestos.push(presupuesto);
    }
    
    this.invInstitucional.Presupuesto = presupuestos;

    
    console.log(productos);
    console.log(this.invInstitucional);


    this._dataService.MergeInvestigacion(this.invInstitucional).subscribe( data => {
      console.log(data);
    });


  }

}
