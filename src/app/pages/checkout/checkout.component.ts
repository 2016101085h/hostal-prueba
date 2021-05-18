import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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
    this.hs.selectHabitacionCheckout(tipo).subscribe((resp: any) => {
      // console.log(resp);
      // console.log(this.piso);
      this.habitacion = resp.habitacion;
    });
  }
  // tslint:disable-next-line: typedef
  mandarHabitacion(item) {
      this.router.navigate(['/dashboard/checkout-procesar', item.id]);
  }


}
