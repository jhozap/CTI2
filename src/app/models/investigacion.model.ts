import { Area } from './interfaces.class';
import { AnonymousSubject } from 'rxjs/internal/Subject';


export class InvestigacionInstitucional {

  informacionBase: InformacionBase;
  investigadores: any;
  guia: Guia;
  articulo: Articulo;
  manuales: Autor;
  cartilla: Autor;
  procedimientos: Autor;
  prototipo: Autor;
  instructivos: Autor;
  libro: Libro;
  estimulos: Estimulos;
  eventos: Eventos;
  convocatoriaColciencias: Presupuesto;
  ministerios: Presupuesto;
  entesInternacionales: Presupuesto;
  otrasInstituciones: Presupuesto;
  rubroPresupuestal: Presupuesto;
  convocatorioInterna: Presupuesto;
  conveniosExternos: Presupuesto;
  presupuestoPersonal: Presupuesto;

}


export class InformacionBase {
  tituloInvestigacion: any;
  direccionDuena: any;
  escuelas: any;
  anio: any;
  entidadesExternas: any;
  areaLinea: AreaLineaa[];

}

export class AreaLineaa {
  idArea: any;
  idLinea: any;
}

export class Guia {
  check: boolean;
  autor: any;
}

export class Articulo {
  check: boolean;
  nombreRevista: any;
  nombreArticulo: any;
  anio: any;
  codigoISSN: any;
  autor: any;
}

export class Autor {
  check: boolean;
  autor: any;
}

export class Libro {
  checkLibro: boolean;
  checkCapLibro: boolean;
  nombreLibro: any;
  paginaLibro: any;
  paginaFinal: any;
  editorial: any;
  fechaPublicacion: any;
}

export class Estimulos {
  condecoraciones: boolean;
  permiso: boolean;
  capacitaciones: boolean;
  idCapacitacion: any;
  felicitaciones: boolean;
  estatuillas: boolean;
  personajeMes: boolean;
  monedas: boolean;
}

export class Eventos {
  tipo: any;
  participacion: any;
  fecha: any;
  esNacional: boolean;
  pais: any;
  ciudad: any;
  departamento: any;
  ciudadDpto: any;
}

export class Presupuesto{
  nombre: any;
  descripcion: any;
  aporte: any;
}
