import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  // tslint:disable-next-line: typedef
  rows: any = [];
  temp = [];
  categorias: any = [];
  accion: any;
  datoEnviar: any;
  loading = true;

  constructor(private cs: CategoriasService) {
    this.cs.getCategorias().subscribe((resp: any) => {
      // console.log('hola', resp);
      console.log( resp);
      // // push our inital complete list
      this.rows = resp.categoria;
      this.categorias = this.rows;
      this.temp = [...this.categorias];
      this.loading = false;
      // console.log(this.rows)
    });
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  ngOnInit(){}
  // tslint:disable-next-line: use-lifecycle-interface
  // tslint:disable-next-line: typedef
  cargarTabla(event) {
    // const data = {...event};
    // console.log(data);
    this.rows = [...event];
    this.categorias = [...this.rows];
  }
  // tslint:disable-next-line: typedef
  actualizarRol(event){
    // console.log('hola');
    //  const data = [...event];
     this.categorias = [...event.categoria];

  }
  // columns = [{ prop: 'id' }, { name: 'Nombre' }, { name: 'Descripcion' }, { name: 'Estado' }, {name: 'Opciones'}];
  // tslint:disable-next-line: typedef
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    // tslint:disable-next-line: typedef
    const temp = this.temp.filter((d) => {
      return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.categorias = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  // tslint:disable-next-line: typedef
  desactivarCategoria(categoria){
    console.log(categoria);
    this.cs.desactivar(categoria).subscribe((resp) => {
      // console.log(resp);
      Swal.fire({
        title: 'Estas seguro de Desactivar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Desactivado!',
            'El registro ha sido eliminado.',
            'success'
          );
          // this.categorias.splice(indice, 1);
          this.cs.getCategorias().subscribe((respuesta) => {
           this.categorias = [...respuesta.categoria];
         });
        }
      });

     });
  }
  // tslint:disable-next-line: typedef
  activarRol(categoria){
    // console.log(categoria);
    this.cs.activar(categoria).subscribe((resp) => {
      // console.log(resp);
      Swal.fire({
        title: 'Estas seguro de Activar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Activado!',
            'El registro ha sido eliminado.',
            'success'
          );
          // this.rols.splice(indice, 1);
          this.cs.getCategorias().subscribe((respuesta) => {
           this.categorias = [...respuesta.categoria];
         });
        }
      });

     });
  }

}
