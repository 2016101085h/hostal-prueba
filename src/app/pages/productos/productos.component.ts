import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: member-ordering
  rows: any = [];
  // tslint:disable-next-line: member-ordering
  temp = [];
  // tslint:disable-next-line: member-ordering
  producto: any = [];
  // tslint:disable-next-line: member-ordering
  accion: any;
  // tslint:disable-next-line: member-ordering
  datoEnviar: any;
  // tslint:disable-next-line: member-ordering
  loading = true;
  constructor(private ps: ProductosService) {
    this.ps.getProducto().subscribe((resp: any) => {
      // console.log('hola', resp);
      console.log( resp);
      // // push our inital complete list
      this.rows = resp.producto;
      this.producto = this.rows;
      this.temp = [...this.producto];
      this.loading = false;
      // console.log(this.rows)
    });
  }
  // hslint:disable-next-line: use-lifecycle-interface
  // hslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  cargarTabla(event) {
    // const data = {...event};
    // console.log(data);
    this.rows = [...event];
    this.producto = [...this.rows];
  }
  // hslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  actualizarProducto(event){
    // console.log('hola');
    //  const data = [...event];
     this.producto = [...event.producto];

  }
  // columns = [{ prop: 'id' }, { name: 'Nombre' }, { name: 'Descripcion' }, { name: 'Estado' }, {name: 'Opciones'}];
  // hslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    // hslint:disable-next-line: typedef
    const temp = this.temp.filter((d) => {
      return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.producto = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  // hslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  eliminarProducto(producto){
    // console.log(producto);
    this.ps.eliminarProducto(producto).subscribe((resp) => {
      // console.log(resp);
      Swal.fire({
        title: 'Estas seguro de Eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          );
          // this.habitacion.splice(indice, 1);
          this.ps.getProducto().subscribe((respuesta) => {
            console.log(respuesta);
            this.producto = [...respuesta.producto];
         });
        }
      });
     });
  }


}
