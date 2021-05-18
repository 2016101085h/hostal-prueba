import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { HuespedService } from '../../services/huesped.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  rows: any = [];
  temp = [];
  huesped: any = [];
  accion: any;
  datoEnviar: any;
  loading = true;
  constructor(private hs: HuespedService) {
    this.hs.getHuesped().subscribe((resp: any) => {
      // console.log('hola', resp);
      console.log( resp);
      // // push our inital complete list
      this.rows = resp.huesped;
      this.huesped = this.rows;
      this.temp = [...this.huesped];
      this.loading = false;
      // console.log(this.rows)
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  // tslint:disable-next-line: typedef
  cargarTabla(event) {
    // const data = {...event};
    // console.log(data);
    this.rows = [...event];
    this.huesped = [...this.rows];
  }
  // tslint:disable-next-line: typedef
  actualizarHuesped(event){
    // console.log('hola');
    //  const data = [...event];
     this.huesped = [...event.huesped];

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
    this.huesped = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  // tslint:disable-next-line: typedef
  EliminarHuesped(huesped){
    console.log(huesped);
    this.hs.eliminarHuesped(huesped).subscribe((resp) => {
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
          // this.rols.splice(indice, 1);
          this.hs.getHuesped().subscribe((respuesta) => {
           this.huesped = [...respuesta.huesped];
         });
        }
      });

     });
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {

  }
}
