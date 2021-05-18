import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {
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

  public url = `${environment.base_url}admin/tipo`;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getTipoHabitacion(){
    const ruta = `${this.url}`;
    return this.http.get(ruta, this.headers).pipe(map((resp: any) => resp) );
  }
  // tslint:disable-next-line: typedef
  selectTipoHabitacion(){
    const ruta = `${this.url}/gettipo`;
    return this.http.get(ruta, this.headers);
  }
  // tslint:disable-next-line: typedef
  guardarTipoHabitacion(tipoHabitacion){
    const ruta = `${this.url}/guardar`;
    return this.http.post(ruta, tipoHabitacion, this.headers);
  }
  // tslint:disable-next-line: typedef
  actualizarTipoHabitacion(tipoHabitacion){
    const ruta = `${this.url}/actualizar`;
    return this.http.put(ruta, tipoHabitacion, this.headers);
  }
  // tslint:disable-next-line: typedef
  eliminarTipoHabitacion(tipoHabitacion){
    const ruta = `${this.url}/eliminar`;
    return this.http.put(ruta, tipoHabitacion, this.headers);
  }
}
