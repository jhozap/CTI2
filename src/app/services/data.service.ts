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

  public getGrados() {
    return this.http.get(environment.pathApi + '/Grado/ConsultaGrados', {
      headers: this.generateBasicHeaders()
    });
  }
  
}
