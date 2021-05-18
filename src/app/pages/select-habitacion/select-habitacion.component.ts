import { Component, OnInit, OnChanges} from '@angular/core';
import { HabitacionService } from '../../services/habitacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-select-habitacion',
  templateUrl: './select-habitacion.component.html',
  styleUrls: ['./select-habitacion.component.css']
})
export class SelectHabitacionComponent implements OnInit, OnChanges {

  habitacion: Array<any> = [];
  piso = 'primero';
  constructor(private hs: HabitacionService,
              private router: Router) { }
  ngOnInit(): void {
    this.getHabitacion(this.piso);
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(): void {
    console.log(this.piso);
  }
  // tslint:disable-next-line: typedef
  getHabitacion(tipo){
    this.hs.selectHabitacion(tipo).subscribe((resp: any) => {
      // console.log(resp);
      // console.log(this.piso);
      this.habitacion = resp.habitacion;
    });
  }
  // tslint:disable-next-line: typedef
  mandarHabitacion(item) {
    if (item.estado === 'ocupado') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'La habitacion esta ocupado',
        showConfirmButton: false,
        timer: 1500
      });
    }else if (item.estado === 'sucio'){
      // Swal.fire({
      //   position: 'center',
      //   icon: 'info',
      //   title: 'La habitacion esta en limpieza',
      //   showConfirmButton: false,
      //   timer: 1500
      // });
      Swal.fire({
        title: 'Esta seguro de cambiar de estado la Habitación',

        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Hazlo'
      }).then((result) => {
        if (result.isConfirmed) {
          const estado = 'disponible';
          const datoEnviar = {
            ...item,
            estado
          }
          this.hs.actualizarEstadoHabitacion(datoEnviar).subscribe((resp) => {
            this.getHabitacion(this.piso);
          });
          Swal.fire(
            'Actualizado!',
            'La habitación esta disponible ahora!.',
            'success'
          )
        }
      })

    }else {
      this.router.navigate(['/dashboard/seleccionar-habitacion', item.id]);

    }
  }

}
