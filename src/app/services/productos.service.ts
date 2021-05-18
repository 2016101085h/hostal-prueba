import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public url = `${environment.base_url}producto`;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getProducto(){
    const ruta = `${this.url}`;
    return this.http.get(ruta).pipe(map((resp: any) => resp) );
  }
  // tslint:disable-next-line: typedef
  getListProducto() {
    const ruta = `${this.url}/listarproductos`;
    return this.http.get(ruta);
  }
  // tslint:disable-next-line: typedef
  guardarProducto(Producto){
    const ruta = `${this.url}/guardar`;
    return this.http.post(ruta, Producto);
  }
  // tslint:disable-next-line: typedef
  actualizarProducto(Producto){
    const ruta = `${this.url}/actualizar`;
    return this.http.put(ruta, Producto);
  }
  // tslint:disable-next-line: typedef
  eliminarProducto(Producto){
    const ruta = `${this.url}/eliminar`;
    return this.http.put(ruta, Producto);
  }
}
