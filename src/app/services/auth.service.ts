import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = `${environment.base_url}`;
  userToken: string;
  public usuario: Usuario;
  constructor(private http: HttpClient) {
    // this.leerToken();
  }
  // tslint:disable-next-line: typedef
  login (usuario){
    return this.http.post(`${this.url}login`, usuario).pipe(map((resp: any): any => {
      if (resp.status){
        this.guardarToken(resp.token);

      }
      // tslint:disable-next-line: variable-name

      return resp;
    }));
  }

  // tslint:disable-next-line: typedef
  validarToken() {
    const token = localStorage.getItem('token') || '';
    return  this.http.get(`${this.url}admin/getuser`, {
      headers: {
        Authorization : `Bearer ${token}`
      }
    }).pipe(
      tap( (resp: any) => {
        if (resp.user) {
          const {id, nombre, num_documento, celular, rol_id, imagen, email, rol} = resp.user;
          this.usuario = new Usuario(nombre, num_documento, celular, rol_id, imagen, email, id, rol);
        }
      }), map((resp) => {
        console.log(resp);
        if (!resp.status){
          return false;

        }else{

          return true;
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('expira');
  }
  // tslint:disable-next-line: typedef
  private guardarToken (token: string): void{
    this.userToken = token;
    // tslint:disable-next-line: variable-name
    const token_decoded: any = jwt_decode(this.userToken);
    localStorage.setItem('expira', token_decoded.exp);
    // console.log(token_decoded);
    localStorage.setItem('token', token);
  }

  // tslint:disable-next-line: typedef
  leerToken(){

    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  // tslint:disable-next-line: ban-types
  estaAutenticado(): Boolean {
    if (this.userToken.length === 0){
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate < new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
