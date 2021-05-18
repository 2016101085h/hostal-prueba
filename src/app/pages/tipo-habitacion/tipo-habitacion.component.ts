import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoHabitacionService } from '../../services/tipo-habitacion.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-tipo-habitacion',
  templateUrl: './tipo-habitacion.component.html',
  styleUrls: ['./tipo-habitacion.component.css']
})
export class TipoHabitacionComponent {
    public url = environment.base;
    // tslint:disable-next-line: typedef
    rows: any = [];
    temp = [];
    tipo: any = [];
    accion: any;
    datoEnviar: any;
    loading = true;
    constructor(private ts: TipoHabitacionService) {
      this.ts.getTipoHabitacion().subscribe((resp: any) => {
        // console.log('hola', resp);
        console.log( resp);
        // // push our inital complete list
        this.rows = resp.tipo;
        this.tipo = this.rows;
        this.temp = [...this.tipo];
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
      this.tipo = [...this.rows];
    }
    // tslint:disable-next-line: typedef
    actualizarTipoHabitacion(event){
      // console.log('hola');
      //  const data = [...event];
       this.tipo = [...event.tipo];

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
      this.tipo = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }
    // tslint:disable-next-line: typedef
    eliminarTipoHabitacion(tipo){
      // console.log(tipo);
      this.ts.eliminarTipoHabitacion(tipo).subscribe((resp) => {
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
            // this.tipo.splice(indice, 1);
            this.ts.getTipoHabitacion().subscribe((respuesta) => {
              console.log(respuesta);
              this.tipo = [...respuesta.tipo];
           });
          }
        });
       });
    }

}
