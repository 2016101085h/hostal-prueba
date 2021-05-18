import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HabitacionService } from '../../services/habitacion.service';
@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: member-ordering
  rows: any = [];
  // tslint:disable-next-line: member-ordering
  temp = [];
  // tslint:disable-next-line: member-ordering
  habitacion: any = [];
  // tslint:disable-next-line: member-ordering
  accion: any;
  // tslint:disable-next-line: member-ordering
  datoEnviar: any;
  // tslint:disable-next-line: member-ordering
  loading = true;
  estado: string;
  // tslint:disable-next-line: member-ordering
  public estadoHabitacion = ['disponible', 'sucio', 'ocupado', 'checkout'];
  constructor(private hs: HabitacionService) {
    this.hs.getHabitacion().subscribe((resp: any) => {
      // console.log('hola', resp);
      console.log( resp);
      // // push our inital complete list
      this.rows = resp.habitacion;
      this.habitacion = this.rows;
      this.temp = [...this.habitacion];
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
    this.habitacion = [...this.rows];
  }
  // hslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  actualizarHabitacion(event){
    // console.log('hola');
    //  const data = [...event];
     this.habitacion = [...event.habitacion];

  }
  // columns = [{ prop: 'id' }, { name: 'Nombre' }, { name: 'Descripcion' }, { name: 'Estado' }, {name: 'Opciones'}];
  // hslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  updateFilter(event) {
    const val = event.target.value;
    // filter our data
    // hslint:disable-next-line: typedef
    const temp = this.temp.filter((d) => {
      return d.numero.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.habitacion = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  // hslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  eliminarHabitacion(habitacion){
    // console.log(habitacion);
    this.hs.eliminarHabitacion(habitacion).subscribe((resp) => {
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
          this.hs.getHabitacion().subscribe((respuesta) => {
            console.log(respuesta);
            this.habitacion = [...respuesta.habitacion];
         });
        }
      });
     });
  }
  // tslint:disable-next-line: typedef
  actualizarEstado(data, estado){
    // console.log(data, estado);
    const datoEnviar = {
      ...data,
      estado
    };
    // console.log(datoEnviar);
    this.hs.actualizarEstadoHabitacion(datoEnviar).subscribe((resp) => {
      console.log(resp);
      this.hs.getHabitacion().subscribe((respuesta) => {
        console.log(respuesta);
        this.habitacion = [...respuesta.habitacion];
     });
    });
  }

}
