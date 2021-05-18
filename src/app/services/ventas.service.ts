import { environment } from './../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public url = `${environment.base_url}venta`;
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  registrarVenta(datos: any) {
    const ruta = `${this.url}/registrar`;
    return this.http.post(ruta, datos);
  }

  // tslint:disable-next-line: typedef
  obtenerVentas(fecha_hora) {
    const ruta = `${this.url}?buscar=${fecha_hora}`;
    return this.http.get(ruta);
  }
  // tslint:disable-next-line: typedef
  anularVenta(venta) {
    const ruta = `${this.url}/anular`;
    return this.http.put(ruta, venta);
  }

  // tslint:disable-next-line: typedef
  obtenerDetalleVenta(venta){
    const ruta = `${this.url}/obtenerDatos?id=${venta.id}&recepcion_id=${venta.recepcion_id}`;
    return this.http.get(ruta);
  }

  imprimirTicket(recepcion_id, venta_id, data : {}){
    const ruta = `${this.url}/imprimir/${recepcion_id}-${venta_id}`;
    return this.http.post(ruta, data);
  }

}
