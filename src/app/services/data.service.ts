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

  getRedes() {
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

  public newUser(params: any) {
    return this.http.post(environment.pathApi + '/Usuario/CrearModificarUsuario', params, {
      headers: this.generateBasicHeaders()
    });
  }
  
}
