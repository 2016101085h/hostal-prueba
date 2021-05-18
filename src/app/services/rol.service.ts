import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  public url = `${environment.base_url}admin/rol`;
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  get Token(){
    return localStorage.getItem('token') || '';
  }

  // tslint:disable-next-line: typedef
  get headers(){
    return {
      headers: {
        Authorization : `Bearer ${this.Token}`
      }
    };
  }

  // tslint:disable-next-line: typedef
  getRoles(){
    const ruta = `${this.url}`;
    return this.http.get(ruta, this.headers).pipe(map((resp: any) => resp) );
  }
  // tslint:disable-next-line: typedef
  selectRol(){
    const ruta = `${this.url}/getrol`;
    return this.http.get(ruta, this.headers).pipe(map((resp: any) => resp) );
  }
  // tslint:disable-next-line: typedef
  guardarRol(rol){
    const ruta = `${this.url}/guardar`;
    return this.http.post(ruta, rol, this.headers);
  }
  // tslint:disable-next-line: typedef
  actualizar(rol){
    const ruta = `${this.url}/actualizar`;
    return this.http.put(ruta, rol, this.headers);
  }
  // tslint:disable-next-line: typedef
  desactivar(rol){
    const ruta = `${this.url}/desactivar`;
    return this.http.put(ruta, rol, this.headers);
  }
  // tslint:disable-next-line: typedef
  activar(rol){
    const ruta = `${this.url}/activar`;
    return this.http.put(ruta, rol, this.headers);
  }
}
