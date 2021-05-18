import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  public url = `${environment.base_url}habitacion`;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getHabitacion(){
    const ruta = `${this.url}`;
    return this.http.get(ruta).pipe(map((resp: any) => resp) );
  }
  // tslint:disable-next-line: typedef
  selectHabitacion(piso){
    const ruta = `${this.url}/selecthabitacion?piso=${piso}`;
    return this.http.get(ruta);
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: adjacent-overload-signatures
  // tslint:disable-next-line: typedef
  selectHabitacionOcupada(piso) {
    const ruta = `${this.url}/gethabitacionocupada?piso=${piso}`;
    return this.http.get(ruta);
  }
  // tslint:disable-next-line: typedef
  selectHabitacionCheckout(piso) {
    const ruta = `${this.url}/gethabitacioncheck?piso=${piso}`;
    return this.http.get(ruta);
  }

  // tslint:disable-next-line: typedef
  getHabitacionId(id){
    const ruta = `${this.url}/gethabitacion?id=${id}`;
    return this.http.get(ruta);
  }
  // tslint:disable-next-line: typedef
  guardarHabitacion(Habitacion){
    const ruta = `${this.url}/guardar`;
    return this.http.post(ruta, Habitacion);
  }
  // tslint:disable-next-line: typedef
  actualizarHabitacion(Habitacion){
    const ruta = `${this.url}/actualizar`;
    return this.http.put(ruta, Habitacion);
  }
  // tslint:disable-next-line: typedef
  eliminarHabitacion(Habitacion){
    const ruta = `${this.url}/eliminar`;
    return this.http.put(ruta, Habitacion);
  }
  // tslint:disable-next-line: typedef
  actualizarEstadoHabitacion(Habitacion){
    const ruta = `${this.url}/actualizarEstado`;
    return this.http.put(ruta, Habitacion);
  }
}
