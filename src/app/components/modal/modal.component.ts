import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';
import { TipoHabitacionService } from '../../services/tipo-habitacion.service';
import { HabitacionService } from '../../services/habitacion.service';
import { HuespedService } from '../../services/huesped.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  nombreR = '';
  descripcionR = '';
  imagenR: any;
  valorImagen = '';
  precioR: number;
  estadoR = '1';
  numeroR: number;
  // tslint:disable-next-line: variable-name
  tipo_habitacion_idR = '0';
  // tslint:disable-next-line: variable-name
  rol_idR= '0';
  pisoR = '2';
  // tslint:disable-next-line: variable-name
  tipo_documentoR = '0';
  // tslint:disable-next-line: variable-name
  num_documentoR = '';
  // tslint:disable-next-line: variable-name
  fecha_nacimientoR = '';
  celularR = '';
  procedenciaR = '';
  // tslint:disable-next-line: variable-name
  categoria_idR = '0';
  // tslint:disable-next-line: variable-name
  precio_ventaR: number;
  codigoR = '';
  stockR: number;
  emailR = '';
  passwordR = '';
  password2R = '';
  disable = false;
  inputDisable = false;
  validpass = false;

  arrayTipoHabitacion = [];
  arrayCategoria = [];
  arrayRol = [];
  @Input() public accion = 'guardar';
  @Input() data;
  @Input() template;
  generalData: any;
  titulo = '';
  modalRef: BsModalRef;
  @Output() DatoIngresado = new EventEmitter();
  @Output() DatoActualizado = new EventEmitter();
  constructor(private rs: RolService,
              private modalService: BsModalService,
              private ts: TipoHabitacionService,
              private hs: HabitacionService,
              private huesped: HuespedService,
              private categoria: CategoriasService,
              private producto: ProductosService,
              private us: UsuarioService,
              private toast: ToastrService) {
                this.getTipoHabitacion();
                this.getCategoria();
                this.getRoles();
    // this.rs.getRoles().subscribe((resp) => {
    //   console.log(resp);
    // });
    // console.log(this.accion);
  }
  // tslint:disable-next-line: typedef
  getTipoHabitacion(){
    this.ts.selectTipoHabitacion().subscribe((resp: any) => {
      // console.log(resp);
      this.arrayTipoHabitacion = resp.tipo;
    });
  }
  // tslint:disable-next-line: typedef
  getCategoria() {
    this.categoria.getCategorias().subscribe((resp: any) => {
      this.arrayCategoria = resp.categoria;
      // console.log(this.arrayCategoria);
    });
  }
  // tslint:disable-next-line: tsypedef
  // tslint:disable-next-line: typedef
  getRoles() {
    this.rs.selectRol().subscribe((resp: any) => {
      this.arrayRol = resp.rol;
    });
  }
  // tslint:disable-next-line: typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.generalData = this.data;
    console.log(this.generalData);
    if (Object.keys(this.generalData).length !== 0){
      this.nombreR = this.generalData.nombre;
      this.descripcionR = this.generalData.descripcion;
      this.valorImagen = this.generalData.imagen;
      this.numeroR = this.generalData.numero;
      this.precioR = this.generalData.precio;
      this.estadoR = this.generalData.estado;
      this.tipo_habitacion_idR = this.generalData.tipo_habitacion_id;
      this.pisoR = this.generalData.piso;
      this.tipo_documentoR = this.generalData.tipo_documento;
      this.num_documentoR = this.generalData.num_documento;
      this.fecha_nacimientoR = this.generalData.fecha_nacimiento;
      this.celularR = this.generalData.celular;
      this.procedenciaR = this.generalData.procedencia;
      this.categoria_idR = this.generalData.categoria_id;
      this.precio_ventaR = this.generalData.precio_venta;
      this.stockR = this.generalData.stock;
      this.codigoR = this.generalData.codigo;
      this.emailR = this.generalData.email;
      this.rol_idR = this.generalData.rol_id;
      this.disable = true;
      this.inputDisable = true;
      this.password2R = '';
      this.passwordR = this.generalData.password;
      this.password2R = this.generalData.password;

      // console.log(this.descripcionR);
    }else{
      this.nombreR = '';
      this.descripcionR = '';
      this.imagenR = '';
      this.valorImagen = '';
      this.tipo_habitacion_idR = '0';
      this.estadoR = '1';
      this.precioR = 0.00;
      this.numeroR = 0;
      this.pisoR = '2';
      this.tipo_documentoR = '0';
      this.num_documentoR = '';
      this.fecha_nacimientoR = '';
      this.celularR = '';
      this.procedenciaR = '';
      this.categoria_idR = '0';
      this.precio_ventaR = 0;
      this.stockR = 0;
      this.codigoR = '';
      this.emailR = '';
      this.rol_idR = '0';
      this.passwordR = '';
      this.password2R = '';
    }
  }
  // tslint:disable-next-line: typedef
  msgExitoso(texto) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El registro ha sido ' + texto +  ' exitosamente',
      showConfirmButton: false,
      timer: 1500
    });
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  changeImagen() {
    // const btn_file = $('.btn-file');
    const imagen = $('#imagen');
    // console.log(imagen[0].files[0].name);
    this.valorImagen = imagen[0].files[0].name;
  }
  ngOnInit(): void {
    // console.log(this.accion);
    // console.log(this.data);
  }
  // tslint:disable-next-line: typedef
  nuevoRol(rol: any){
    // console.log(rol);
    if (!rol.valid){
      return;
    }
    if (this.accion === 'actualizar'){
      // console.log('actualizado');
      const rolUpdate = {...this.generalData, nombre: this.nombreR, descripcion: this.descripcionR};
      // console.log(rolUpdate);
      this.rs.actualizar(rolUpdate).subscribe((resp) => {
        // console.log(resp);
        this.modalRef.hide();
        this.msgExitoso('actualizado');
        this.rs.getRoles().subscribe((respuesta) => {
          this.DatoActualizado.emit(respuesta);

        });
        rol.reset();
      });
      // console.log(this.generalData);
    }

    // console.log(rol.value);
    if (this.accion === 'guardar'){
    this.rs.guardarRol(rol.value).subscribe((resp) => {
      console.log('gaurdado');
      this.modalRef.hide();
      this.msgExitoso('guardado');
      // tslint:disable-next-line: no-shadowed-variable
      this.rs.getRoles().subscribe((respuesta: any) => {
        this.DatoIngresado.emit(respuesta.rol);
      });
      rol.reset();
    });
   }
  }

  // tslint:disable-next-line: typedef
  nuevoTipoHabitacion(tipo: any){
    // console.log(tipo);
    if (!tipo.valid){
      return;
    }
    if (this.accion === 'actualizar'){
      // console.log('actualizado');
      const rolUpdate = {...this.generalData, nombre: this.nombreR, descripcion: this.descripcionR, imagen: this.imagenR};
      // console.log(rolUpdate);
      this.ts.actualizarTipoHabitacion(rolUpdate).subscribe((resp) => {
        // console.log(resp);
        this.modalRef.hide();
        this.msgExitoso('actualizado')
        this.ts.getTipoHabitacion().subscribe((respuesta) => {
          this.DatoActualizado.emit(respuesta);
        });
        tipo.reset();
      });
      // console.log(this.generalData);
    }

    // console.log(rol.value);
    if (this.accion === 'guardar'){
      const datoEnviar = {
        nombre : tipo.value.nombre,
        descripcion: tipo.value.descripcion,
        imagen: this.imagenR
      }

      this.ts.guardarTipoHabitacion(datoEnviar).subscribe((resp) => {
      // console.log('gaurdado');
      this.modalRef.hide();
      this.msgExitoso('guardado');
      // tslint:disable-next-line: no-shadowed-variable
      this.ts.getTipoHabitacion().subscribe((respuesta: any) => {

        this.DatoIngresado.emit(respuesta.tipo);
      });
      console.log(resp);
      tipo.reset();
    });
   }
  }
  // tslint:disable-next-line: typedef
  subirImagen(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (file) => {
      this.imagenR = reader.result;
      // console.log(this.imagenR);
    };
    reader.readAsDataURL(file);
}
// tslint:disable-next-line: typedef
nuevahabitacion(habitacion) {
  console.log(habitacion);
  if (!habitacion.valid){
    return;
  }
  if (this.accion === 'actualizar'){
    // console.log('actualizado');
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: radix
    // tslint:disable-next-line: max-line-length
    const rolUpdate = {...this.generalData, estado: this.estadoR, precio: this.precioR, numero: this.numeroR, tipo_habitacion_id: parseInt(this.tipo_habitacion_idR), piso: this.pisoR};
    // console.log(rolUpdate);
    this.hs.actualizarHabitacion(rolUpdate).subscribe((resp) => {
      // console.log(resp);
      this.modalRef.hide();
      this.msgExitoso('actualizado');
      this.hs.getHabitacion().subscribe((respuesta) => {
        this.DatoActualizado.emit(respuesta);

      });
      habitacion.reset();
    });
    // console.log(this.generalData);
  }

  // console.log(rol.value);
  if (this.accion === 'guardar'){
    const datoEnviar = {
      estado : habitacion.value.estado,
      numero: habitacion.value.numero,
      precio: habitacion.value.precio,
      piso: habitacion.value.piso,
      // tslint:disable-next-line: radix
      tipo_habitacion_id : parseInt(habitacion.value.tipo_habitacion_id)
    }

    this.hs.guardarHabitacion(datoEnviar).subscribe((resp) => {
    console.log('gaurdado');
    this.modalRef.hide();
    this.msgExitoso('guardado');
    // tslint:disable-next-line: no-shadowed-variable
    this.hs.getHabitacion().subscribe((respuesta: any) => {

      this.DatoIngresado.emit(respuesta.habitacion);
    });
    console.log(resp);
    habitacion.reset();
  });
 }
}
// tslint:disable-next-line: typedef
nuevoHuesped(huesped) {
  console.log(huesped);
  if (!huesped.valid){
    return;
  }
  if (this.accion === 'actualizar'){
    // console.log('actualizado');
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: radix
    // tslint:disable-next-line: max-line-length
    const rolUpdate = {...this.generalData, tipo_documento: this.tipo_documentoR, num_documento: this.num_documentoR, nombre: this.nombreR, fecha_nacimiento: this.fecha_nacimientoR, celular: this.celularR,
    procedencia: this.procedenciaR};
    // console.log(rolUpdate);
    this.huesped.actualizarHuesped(rolUpdate).subscribe((resp) => {
      // console.log(resp);
      this.modalRef.hide();
      this.msgExitoso('actualizado');
      this.huesped.getHuesped().subscribe((respuesta) => {
        this.DatoActualizado.emit(respuesta);

      });
      huesped.reset();
    });
    // console.log(this.generalData);
  }

  // console.log(rol.value);
  if (this.accion === 'guardar'){

    this.huesped.guardarHuesped(huesped.value).subscribe((resp: any) => {
    console.log(resp);
    this.modalRef.hide();
    if (resp.huesped === 'Existe'){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El Cliente ya ha sido registrado',
        showConfirmButton: false,
        timer: 1500
      });
    }else{

      this.msgExitoso('guardado');
      // tslint:disable-next-line: no-shadowed-variable
      this.huesped.getHuesped().subscribe((respuesta: any) => {
        this.DatoIngresado.emit(respuesta.huesped);
      });
      console.log(resp);
      huesped.reset();
    }
  });
 }
}
// tslint:disable-next-line: typedef
nuevaCategoria(categoria: any){
  // console.log(categoria);
  if (!categoria.valid){
    return;
  }
  if (this.accion === 'actualizar'){
    // console.log('actualizado');
    const rolUpdate = {...this.generalData, nombre: this.nombreR, descripcion: this.descripcionR};
    // console.log(rolUpdate);
    this.categoria.actualizar(rolUpdate).subscribe((resp) => {
      // console.log(resp);
      this.modalRef.hide();
      this.msgExitoso('actualizado');
      this.categoria.getCategorias().subscribe((respuesta) => {
        this.DatoActualizado.emit(respuesta);

      });
      categoria.reset();
    });
    // console.log(this.generalData);
  }

  // console.log(rol.value);
  if (this.accion === 'guardar'){
  this.categoria.guardarCategoria(categoria.value).subscribe((resp) => {
    console.log('gaurdado');
    this.modalRef.hide();
    this.msgExitoso('guardado');
    // tslint:disable-next-line: no-shadowed-variable
    this.categoria.getCategorias().subscribe((respuesta: any) => {
      this.DatoIngresado.emit(respuesta.categoria);
    });
    categoria.reset();
  });
 }
}
// tslint:disable-next-line: typedef
nuevoProducto(producto) {
  // console.log(producto);
  if (!producto.valid){
    return;
  }
  if (this.accion === 'actualizar'){
    // console.log('actualizado');
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: radix
    // tslint:disable-next-line: max-line-length
    const rolUpdate = {...this.generalData, precio_venta: this.precio_ventaR, codigo: this.codigoR, nombre: this.nombreR, categoria_id: parseInt(this.categoria_idR), stock: this.stockR};
    // console.log(rolUpdate);
    this.producto.actualizarProducto(rolUpdate).subscribe((resp) => {
      // console.log(resp);
      this.modalRef.hide();
      this.msgExitoso('actualizado');
      this.producto.getProducto().subscribe((respuesta) => {
        this.DatoActualizado.emit(respuesta);

      });
      producto.reset();
    });
    // console.log(this.generalData);
  }

  // console.log(rol.value);
  if (this.accion === 'guardar'){
    const datoEnviar = {
      codigo : producto.value.codigo,
      nombre: producto.value.nombre,
      precio_venta: producto.value.precio_venta,
      stock: producto.value.stock,
      // tslint:disable-next-line: radix
      categoria_id : parseInt(producto.value.categoria_id)
    }

    this.producto.guardarProducto(datoEnviar).subscribe((resp) => {
    console.log('gaurdado');
    this.modalRef.hide();
    this.msgExitoso('guardado');
    // tslint:disable-next-line: no-shadowed-variable
    this.producto.getProducto().subscribe((respuesta: any) => {

      this.DatoIngresado.emit(respuesta.producto);
    });
    console.log(resp);
    producto.reset();
  });
 }
}

// tslint:disable-next-line: typedef
nuevoUsuario(usuario) {
  console.log(usuario);
  if (!usuario.valid){
    return;
  }
  if (this.accion === 'actualizar'){
    // console.log('actualizado');
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: radix
    // tslint:disable-next-line: max-line-length
    const rolUpdate = {...this.generalData, nombre: this.nombreR, email: this.emailR, celular: this.celularR, rol_id: parseInt(this.rol_idR), num_documento: this.num_documentoR, password: this.passwordR, imagen: this.imagenR};
    console.log(rolUpdate);

    this.us.actulizarUsuario(rolUpdate).subscribe((resp) => {
      // console.log(resp);
      this.modalRef.hide();
      this.msgExitoso('actualizado');
      this.us.getUsuarios().subscribe((respuesta) => {
        this.DatoActualizado.emit(respuesta);

      });
      usuario.reset();
    });
    // console.log(this.generalData);
  }

  // console.log(rol.value);
  if (this.accion === 'guardar'){
    const datoEnviar = {
      nombre : usuario.value.nombre,
      num_documento: usuario.value.num_documento,
      email: usuario.value.email,
      password: usuario.value.password,
      imagen: this.imagenR,
      celular: usuario.value.celular,
      // tslint:disable-next-line: radix
      rol_id : parseInt(usuario.value.rol_id)
    };
    console.log(datoEnviar);

    this.us.guardarUsuario(datoEnviar).subscribe((resp: any) => {
      if (resp.msg){
        this.toast.info(resp.msg);
      }else{
        console.log('gaurdado');
        this.modalRef.hide();
        this.msgExitoso('guardado');
        // tslint:disable-next-line: no-shadowed-variable
        this.us.getUsuarios().subscribe((respuesta: any) => {
          this.DatoIngresado.emit(respuesta.usuario);
        });
        console.log(resp);
        usuario.reset();
    }
  });
 }
}
// tslint:disable-next-line: typedef
validarContrasena(usuario){
  if (usuario.value.password !== usuario.value.password2){
    return true;
  }else{
    return false;
  }
}
}
