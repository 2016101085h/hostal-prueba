import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecepcionService } from '../../services/recepcion.service';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NumberValueAccessor } from '@angular/forms';
@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent implements OnInit {
  recepcionObtenida: any;
  temp = [];
  productos = [];
  rows = [];
  arrayProducto = [];
  loading = true;
  cantidad = 1;
  calcularTotal: number;
  montoActualizado: number;
  mostrar = 0;
  constructor(private route: Router,
              private recepcion: RecepcionService,
              private router: ActivatedRoute,
              private producto: ProductosService,
              private toast: ToastrService) {
                this.router.params.subscribe((resp) => {
                  // console.log(resp);
                  this.recepcion.obtenerRecepcion(resp.id).subscribe((resp: any) => {
                    console.log(resp)
                    const datoUltimo = resp.recepcion.length;
                    // console.log(datoUltimo);
                    this.recepcionObtenida = resp.recepcion[datoUltimo - 1];
                    console.log(this.recepcionObtenida)
                    this.montoActualizado = parseFloat(resp.recepcion[datoUltimo - 1].monto);
                    // console.log(this.montoActualizado);
                  });
                });
                this.getProductos();
              }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  volver() {
    this.route.navigate(['/dashboard/habitaciones-ocupadas']);
  }
  // tslint:disable-next-line: typedef
  getProductos() {
    this.producto.getListProducto().subscribe((resp: any) => {
      console.log(resp);
      this.productos = resp.productos;
      this.temp = [...this.productos];
      // this.rows = [...this.productos];
      this.loading = false;
    });
  }
  // tslint:disable-next-line: typedef
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    // tslint:disable-next-line: typedef
    const temp = this.temp.filter((d) => {
      return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.productos = temp;

}
// tslint:disable-next-line: typedef
openModal(modal){
  modal.show();
  // this.getProductos();
}

// tslint:disable-next-line: typedef
agregarProducto(data: any){
  if (isNaN(data.cantidad)) {
    this.toast.warning('Ingrese la cantidad');
    return;
  }else{
    if (this.encuentra(data.id)) {
      this.toast.info('Ya se agrego este producto');
    } else {
      this.arrayProducto.push({
        producto_id : data.id,
        codigo: data.codigo,
        cantidad: data.cantidad,
        precio: data.precio_venta,
        categoria: data.nombre_categoria,
        producto: data.nombre_producto
      });
      console.log(this.arrayProducto);
      this.getTotal();
    }
  }

}
// tslint:disable-next-line: use-lifecycle-interface
getTotal(): void {
 let resultado = 0;
 // tslint:disable-next-line: prefer-for-of
 for (let i = 0; i < this.arrayProducto.length; i++) {
  // tslint:disable-next-line: radix
  resultado = resultado + (parseFloat(this.arrayProducto[i].precio) * this.arrayProducto[i].cantidad);
 }
 this.calcularTotal = resultado;

 console.log(this.calcularTotal);
}
// tslint:disable-next-line: typedef
eliminarProducto( index) {
  this.arrayProducto.splice(index, 1);
  // tslint:disable-next-line: prefer-for-of
  this.getTotal();
}
// tslint:disable-next-line: typedef
limpiarProductos() {
  this.arrayProducto = [];
  // tslint:disable-next-line: radix
  this.montoActualizado = parseInt(this.recepcionObtenida.monto);
}
// tslint:disable-next-line: typedef
encuentra(id){
  let sw: any;
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.arrayProducto.length; i++){
      if(this.arrayProducto[i].producto_id === id){
          sw = true;
      }
  }
  return sw;
}
// tslint:disable-next-line: typedef
actualizarRecepcion() {

  // console.log(datoEnviar);
  if (this.arrayProducto.length === 0){
    const datoEnviar = {
      id: this.recepcionObtenida.id,
      habitacion_id: this.recepcionObtenida.habitacion_id,
      monto_actualizado: parseFloat(this.recepcionObtenida.monto),
      data: this.arrayProducto
    };
    Swal.fire({
      title: 'Esta seguro de no agregar ningún Producto?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mostrar = 1;
        this.recepcion.actualizarRecepcion(datoEnviar).subscribe((resp) => {
          console.log(resp);
          setTimeout(() => {
            this.route.navigate(['/dashboard/habitaciones-ocupadas']);
          }, 2000);
        });
        console.log(datoEnviar)
      }
    });
  }else{
    Swal.fire({
      title: 'Esta seguro de agregar este(os) productos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, agregar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Agregado!',
          'Su monto final ha sido actualizado.',
          'success'
        );
        this.montoActualizado = parseFloat(this.recepcionObtenida.monto) + this.calcularTotal;
        console.log(this.montoActualizado);
        this.mostrar = 2;
        const datoEnviar = {
          id: this.recepcionObtenida.id,
          habitacion_id: this.recepcionObtenida.habitacion_id,
          monto_actualizado: this.montoActualizado,
          data: this.arrayProducto
        };
        console.log(datoEnviar);
        this.recepcion.actualizarRecepcion(datoEnviar).subscribe((resp) => {
          console.log(resp);
          this.arrayProducto = [];
          setTimeout(() => {
            this.route.navigate(['/dashboard/habitaciones-ocupadas']);
          }, 2000);
        });
      }
    });
  }

}
}
