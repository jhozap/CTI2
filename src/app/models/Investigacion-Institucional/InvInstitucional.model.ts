export class InvInstitucional {
      IdInvestigacion: string;
      Titulo: string;
      Direccion: number; 
      Anio: string;
      Participacion: string; 
      ExParticipa : string;
      Escuela : number
      Estado: number;
      AreaLinea: Array<AreaLinea>;
      Investigadores: Array<Investigarores>;
      Producto: Producto;
      Estimulos: Estimulos;
      Eventos: Eventos;
      Presupuesto: Array<Presupuesto>;
}

export class AreaLinea {
     IdInvestigacion: string;
     IdArea: number; 
     IdLinea: number; 
}

export class Investigarores {
    IdInvestigacion: string;
    IdInvestigador: number;
}

export class Producto {
    IdInvestigacion: string;
    TipoProducto: string;
    Autor: string;
    NombreRevista: string;
    NombreArticulo: string;
    Anio: number;
    CodigoISSN: string;
    NombreLibro: string;
    PaginaInicio: number;
    PaginaFinal: number;
    Editorial: string;
    FechaPublicacion: string;
}

export class Estimulos {
    IdInvestigacion: string;
    Condecoraciones: number;
    Felicitaciones: number; 
    PersonajeMes: number; 
    Permiso: number;
    Estatuillas: number
    Monedas: number 
    Capacitaciones: number; 
}

export class Eventos {
    IdInvestigacion: string;
    Tipo: string;
    Participacion: string;
    Fecha: string;
    TipoRegion: string;
    DescRegion: string;
    DescSubRegion: string;
}

export class Presupuesto {
    IdInvestigacion: string;
    NombrePresupuesto: string;
    DescPresupuesto: string;
    Aporte: number;
}