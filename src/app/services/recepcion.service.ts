import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  public url = `${environment.base_url}recepcion/`;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  guardarRecepcion(dato: any){
    const ruta = `${this.url}guardar`;
    return this.http.post(ruta, dato);
  }
  // tslint:disable-next-line: typedef
  actualizarRecepcion(dato: any){
    const ruta = `${this.url}actualizar`;
    return this.http.post(ruta, dato);
  }
  // tslint:disable-next-line: typedef
  obtenerRecepcion(habitacion_id: any) {
    const ruta = `${this.url}getrecepcion?id=${habitacion_id}`;
    return this.http.get(ruta);

  }
  // tslint:disable-next-line: typedef
  obtenerRecepcionCheckout(habitacion_id: number){
    const ruta = `${this.url}getrecepcioncheckout?habitacion_id=${habitacion_id}`;
    return this.http.get(ruta);
  }
}
