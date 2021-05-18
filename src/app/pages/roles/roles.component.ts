import { ThrowStmt } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RolService } from '../../services/rol.service';
declare var $: any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  // tslint:disable-next-line: typedef
  rows: any = [];
  temp = [];
  rols: any = [];
  accion: any;
  datoEnviar: any;
  loading = true;
  constructor(private rs: RolService) {
    this.rs.getRoles().subscribe((resp: any) => {
      // console.log('hola', resp);
      console.log( resp);
      // // push our inital complete list
      this.rows = resp.rol;
      this.rols = this.rows;
      this.temp = [...this.rols];
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
    this.rols = [...this.rows];
  }
  // tslint:disable-next-line: typedef
  actualizarRol(event){
    // console.log('hola');
    //  const data = [...event];
     this.rols = [...event.rol];

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
    this.rols = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  // tslint:disable-next-line: typedef
  desactivarRol(rol){
    console.log(rol);
    this.rs.desactivar(rol).subscribe((resp) => {
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
          // this.rols.splice(indice, 1);
          this.rs.getRoles().subscribe((respuesta) => {
           this.rols = [...respuesta.rol];
         });
        }
      });

     });
  }
  // tslint:disable-next-line: typedef
  activarRol(rol){
    // console.log(rol);
    this.rs.activar(rol).subscribe((resp) => {
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
          this.rs.getRoles().subscribe((respuesta) => {
           this.rols = [...respuesta.rol];
         });
        }
      });

     });
  }

/* ========================================================================== */
}

