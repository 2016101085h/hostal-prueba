import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { esLocale } from 'ngx-bootstrap/locale';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { HabitacionService } from '../../services/habitacion.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, deLocale, listLocales } from 'ngx-bootstrap/chronos';
// import {Observable} from 'rxjs';
// import {debounceTime, map} from 'rxjs/operators';
import { isBs3 } from 'ngx-bootstrap/utils';
import { HuespedService } from '../../services/huesped.service';
import { RecepcionService } from '../../services/recepcion.service';
import Swal from 'sweetalert2';
// defineLocale('de', deLocale);


@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit {
  DatoHabitacion = [];
  form: FormGroup;
  diaActual = new Date();
  precioHabitacion: any;
  cantidad = 1;
  montoApagar: any;
  diaProximo = new Date();
  public model: any;
  isBs3 = isBs3();
   selected: string;
  huespedArray: any[] = [];
  // tslint:disable-next-line: variable-name
  huesped_id: number;
  constructor(private hs: HabitacionService,
              private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private localservice: BsLocaleService,
              private huesped: HuespedService,
              private recepcion: RecepcionService,
              private route: Router) {
                defineLocale('es', esLocale);

                this.localservice.use('es');
                this.router.params.subscribe(resp => {
                  // console.log(resp.id);
                  this.getDatosHabitacion(resp.id);
                 });

                this.huesped.getHuesped().subscribe((resp: any) => {
                  this.huespedArray = resp.huesped;
                  // console.log(this.huespedArray);
                });
   }


   // tslint:disable-next-line: typedef
   getValor(e) {
    //  e.preventDefault();
    //  console.log(Object.keys(e.item));
     if (Object.keys(e.item).length !== 0) {
      this.rellenarDatosHuesped(e.item);
     }else{
      return;
     }
   }
   // tslint:disable-next-line: typedef
   rellenarDatosHuesped(data) {
    // tslint:disable-next-line: variable-name
    const fecha_formateada = new Date(data.fecha_nacimiento);
    this.form.get('tipo_documento').setValue(data.tipo_documento);
    this.form.get('fecha_nacimiento').setValue(fecha_formateada);
    this.form.get('nombre').setValue(data.nombre);
    this.form.get('celular').setValue(data.celular);
    this.form.get('procedencia').setValue(data.procedencia);
    this.form.get('medio_pago').setValue('Efectivo');
    this.huesped_id = data.id;
    // this.form.get('cantidad').setValue(this.cantidad);

   }
  // tslint:disable-next-line: typedef
  getDatosHabitacion(id){
    this.hs.getHabitacionId(id).subscribe((resp: any) => {
      this.DatoHabitacion = resp;
      // tslint:disable-next-line: radix
      this.precioHabitacion = parseInt(resp[0].precio);
      this.montoApagar = this.cantidad * this.precioHabitacion;
      // console.log(this.precioHabitacion);
    });
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  sumarCantidad() {
    this.cantidad += 1;
    this.montoApagar = this.precioHabitacion * this.cantidad;
    // this.sumarFecha(this.cantidad);
    const diaCambiado = this.diaActual.setDate(this.diaActual.getDate() + this.cantidad);
    // console.log(diaCambiado);
    this.form.get('fecha_salida').setValue(this.diaProximo);
    console.log(this.formatearFecha(diaCambiado));
    // console.log(this.cantidad);
    // this.valueChange(this.cantidad);
  }
  valueChange(value: Date) {
    if(value !== null){
      const anoActual = new Date();
      // console.log(value.getFullYear());
      if(anoActual.getFullYear() - value.getFullYear() < 18){
        Swal.fire('No es mayor de Edad!',
        'Tu registro no continuara si es un menor de edad',
        'error')
        this.form.get('fecha_nacimiento').setValue('');
      }
    }

  }
  // tslint:disable-next-line: typedef
  restarCantidad(){
    if (this.cantidad <= 0){
      return;
    }
    this.cantidad --;
    this.montoApagar = this.precioHabitacion * this.cantidad;
    // this.sumarFecha(this.cantidad);
  }
  // tslint:disable-next-line: typedef
  // sumarFecha(cantidad) {
  //   this.diaProximo.setDate(this.diaProximo.getDate() + cantidad);
  //   this.form.value.fecha_salida = this.diaProximo;
  //   console.log(this.form.value.fecha_salida);
  // }
  ngOnInit(): void {
    this.diaProximo.setDate(this.diaProximo.getDate() + this.cantidad);
    this.inicializatorForm();
  }
  // tslint:disable-next-line: typedef
  formatearFecha(fecha){
    // tslint:disable-next-line: variable-name
    const fecha_nacimiento = new Date(fecha);
    const ano = fecha_nacimiento.getFullYear();
    const mes = fecha_nacimiento.getMonth() + 1;
    const dia = fecha_nacimiento.getDate();
    // tslint:disable-next-line: variable-name
    let fecha_formateado: any;
    // tslint:disable-next-line: variable-name
    if ( mes < 10 && dia < 10){

      fecha_formateado = `${ano}-0${mes}-0${dia}`;
    }else if (mes < 10 && dia >= 10) {

      fecha_formateado = `${ano}-0${mes}-${dia}`;
    }else if (dia < 10 && mes >= 10 ) {
      fecha_formateado = `${ano}-${mes}-0${dia}`;
    }else{
      fecha_formateado = `${ano}-${mes}-${dia}`;

    }
    return fecha_formateado;
  }
  // tslint:disable-next-line: typedef
  enviarForm(e){
    e.preventDefault();
    // console.log(this.formatearFecha(this.form.value.fecha_nacimiento));
    // tslint:disable-next-line: max-line-length
    const datoEnviar = {...this.form.value, fecha_nacimiento: this.formatearFecha(this.form.value.fecha_nacimiento), monto: this.montoApagar, fecha_entrada: this.formatearFecha(this.form.value.fecha_entrada), fecha_salida: this.formatearFecha(this.form.value.fecha_salida), habitacion_id: this.DatoHabitacion[0].id, huesped_id: this.huesped_id, cant_dias: this.cantidad};
    // console.log(this.form);
    console.log(this.form);
     Swal.fire({
       title: 'Estas seguro de realizar el registro?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, registrar!'
     }).then((result) => {
       if (result.isConfirmed) {
         Swal.fire(
           'Registrado!',
           'Tu registro ha sido realizado exitosamente',
           'success'
         );
        this.recepcion.guardarRecepcion(datoEnviar).subscribe((respuesta) => {
          console.log(respuesta);
          this.route.navigate(['/dashboard/seleccionar-habitacion']);
        });
       }
     });


  }
  // tslint:disable-next-line: typedef
  inicializatorForm() {

      this.form = this.formBuilder.group({
        tipo_documento: ['0', Validators.required],
        num_documento: ['', [Validators.required, Validators.maxLength(8)]],
        fecha_nacimiento : ['', Validators.required],
        nombre : ['', Validators.required],
        celular : ['', [Validators.required, Validators.maxLength(9)]],
        // correo: ['', [Validators.email, Validators.required]],
        procedencia: ['', Validators.required],
        // monto: ['', Validators.required],
        cantidad: ['1', Validators.required],
        fecha_entrada: [this.diaActual, Validators.required],
        fecha_salida: [this.diaProximo, Validators.required],
        medio_pago: ['1', Validators.required],
      });
  }

}
