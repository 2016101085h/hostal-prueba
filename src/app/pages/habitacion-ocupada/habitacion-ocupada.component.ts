import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-habitacion-ocupada',
  templateUrl: './habitacion-ocupada.component.html',
  styleUrls: ['./habitacion-ocupada.component.css']
})
export class HabitacionOcupadaComponent implements OnInit {

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
    this.hs.selectHabitacionOcupada(tipo).subscribe((resp: any) => {
      // console.log(resp);
      // console.log(this.piso);
      this.habitacion = resp.habitacion;
    });
  }
  // tslint:disable-next-line: typedef
  mandarHabitacion(item) {
      this.router.navigate(['/dashboard/habitaciones-ocupadas-vender', item.id]);
  }


}
