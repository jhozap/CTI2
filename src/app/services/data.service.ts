import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  protected generateBasicHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-type': 'application/json'
    });
  }

  public getUsers() {    
    return this.http.get(environment.pathApi + '/Usuario/ConsultaUsuarios', {
      headers: this.generateBasicHeaders()
    });
  }

  public getInvestigadores() {    
    return this.http.get(environment.pathApi + '/Investigadores/ConsultaInvestigadores', {
      headers: this.generateBasicHeaders()
    });
  }

  public getCasoEmblematico() {    
    return this.http.get(environment.pathApi + '/casoEmblem/ConsultarCasosEmblem', {
      headers: this.generateBasicHeaders()
    });
  }

  public getRedes() {
    return this.http.get(environment.pathApi + '/Redes/ConsultaRedes', {
      headers: this.generateBasicHeaders()
    });
  }

  public getGrados() {
    return this.http.get(environment.pathApi + '/Grado/ConsultaGrados', {
      headers: this.generateBasicHeaders()
    });
  }

  public getUnidades() {
    return this.http.get(environment.pathApi + '/Unidad/ConsultaUnidades', {
      headers: this.generateBasicHeaders()
    });
  }

  public getEscuelas() {
    return this.http.get(environment.pathApi + '/Unidad/ConsultaEscuelas', {
      headers: this.generateBasicHeaders()
    });
  }

  public getDirecciones() {
    return this.http.get(environment.pathApi + '/Unidad/ConsultaDirecciones', {
      headers: this.generateBasicHeaders()
    });
  }

  public getAreas() {
    return this.http.get(environment.pathApi + '/Area/ConsultaAreas', {
      headers: this.generateBasicHeaders()
    });
  }

  public getAreasXLinea() {
    return this.http.get(environment.pathApi + '/AreaLinea/ConsultaAreaLinea', {
      headers: this.generateBasicHeaders()
    });
  }

  public newUser(params: any) {
    return this.http.post(environment.pathApi + '/Usuario/CrearModificarUsuario', params, {
      headers: this.generateBasicHeaders()
    });
  }

  public newInvestigador(params: any) {
    return this.http.post(environment.pathApi + '/Investigadores/CrearModificarInvestigador', params, {
      headers: this.generateBasicHeaders()
    });
  }

  public MergeInvestigacion(params: any) {
    return this.http.post(environment.pathApi + '/Investigacion/MergeInvestigacion', params, {
      headers: this.generateBasicHeaders()
    });
  }
 
  public deleteUser(id: number) {
    return this.http.delete(environment.pathApi + `/Usuario/EliminarUsuario?id=${id}`, {
      headers: this.generateBasicHeaders()
    });
  }

  public deleteInvestigador(id: number) {
    return this.http.delete(environment.pathApi + `/Investigadores/EliminarInvestigador?id=${id}`, {
      headers: this.generateBasicHeaders()
    });
  }

  public getInvestigacionesInstitucionales() {    
    return this.http.get(environment.pathApi + '/Investigacion/ConsultarInvestigacionesIns', {
      headers: this.generateBasicHeaders()
    });
  }

  public deleteInvestigacionIns(investigacion: string) {
    return this.http.delete(environment.pathApi + `/Investigacion/EliminarInvestigacionInstitucional?investigacion=${investigacion}`, {
      headers: this.generateBasicHeaders()
    }); 
  }
  
}
