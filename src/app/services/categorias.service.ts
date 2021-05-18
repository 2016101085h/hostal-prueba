import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  public url = `${environment.base_url}categoria`;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getCategorias(){
    const ruta = `${this.url}`;
    return this.http.get(ruta).pipe(map((resp: any) => resp) );
  }
  // tslint:disable-next-line: typedef
  guardarCategoria(categoria){
    const ruta = `${this.url}/guardar`;
    return this.http.post(ruta, categoria);
  }
  // tslint:disable-next-line: typedef
  actualizar(categoria){
    const ruta = `${this.url}/actualizar`;
    return this.http.put(ruta, categoria);
  }
  // tslint:disable-next-line: typedef
  desactivar(categoria){
    const ruta = `${this.url}/desactivar`;
    return this.http.put(ruta, categoria);
  }
  // tslint:disable-next-line: typedef
  activar(categoria){
    const ruta = `${this.url}/activar`;
    return this.http.put(ruta, categoria);
  }
}
