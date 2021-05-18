import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = `${environment.base_url}usuario`;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getUsuarios(){
    const ruta = `${this.url}`;
    return this.http.get(ruta).pipe(map((resp: any) => resp) );
  }
  getCantidades() {
    const ruta = `${this.url}/datos`;
    return this.http.get(ruta).pipe(map((resp: any) => resp) );
  }
   // tslint:disable-next-line: typedef
   guardarUsuario(Usuario){
    const ruta = `${this.url}/crear`;
    return this.http.post(ruta, Usuario);
  }
   // tslint:disable-next-line: typedef
   eliminarUsuario(Usuario){
    const ruta = `${this.url}/eliminar`;
    return this.http.put(ruta, Usuario);
  }
   // tslint:disable-next-line: typedef
   actulizarUsuario(Usuario){
    const ruta = `${this.url}/actualizar`;
    return this.http.put(ruta, Usuario);
  }
}
