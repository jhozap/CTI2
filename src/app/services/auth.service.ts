import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/requestUser.class';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  protected generateBasicHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-type': 'application/json'
    });
  }

  public login(user: Usuario) {
    // return of(true);
    return this.http.post(environment.pathApi + '/Usuario/Login', user, {
      headers: this.generateBasicHeaders()
    });
  }
}
