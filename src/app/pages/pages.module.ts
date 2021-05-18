import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPruebaComponent } from './content-prueba/content-prueba.component';
import { RolesComponent } from './roles/roles.component';
import { TipoHabitacionComponent } from './tipo-habitacion/tipo-habitacion.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { SelectHabitacionComponent } from './select-habitacion/select-habitacion.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HabitacionOcupadaComponent } from './habitacion-ocupada/habitacion-ocupada.component';
import { ProductosComponent } from './productos/productos.component';
import { VenderComponent } from './vender/vender.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutProcesarComponent } from './checkout-procesar/checkout-procesar.component';
import { VentaDiariaComponent } from './venta-diaria/venta-diaria.component';
import { ModalComponent } from '../components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './usuario/usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VentaMensualComponent } from './venta-mensual/venta-mensual.component';

@NgModule({
  declarations: [
    ContentPruebaComponent,
    RolesComponent,
    TipoHabitacionComponent,
    HabitacionComponent,
    SelectHabitacionComponent,
    RecepcionComponent,
    ClientesComponent,
    ProductosComponent,
    VenderComponent,
    CategoriasComponent,
    HabitacionOcupadaComponent,
    CheckoutComponent,
    CheckoutProcesarComponent,
    VentaDiariaComponent,
    ModalComponent,
    UsuarioComponent,
    PerfilComponent,
    VentaMensualComponent

  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule,
    TypeaheadModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [
    ContentPruebaComponent,
    RolesComponent,
    TipoHabitacionComponent,
    HabitacionComponent,
    SelectHabitacionComponent,
    RecepcionComponent,
    ClientesComponent,
    ProductosComponent,
    VenderComponent,
    CategoriasComponent,
    HabitacionOcupadaComponent,
    CheckoutComponent,
    CheckoutProcesarComponent,
    VentaDiariaComponent,
  ]
})
export class PagesModule { }
