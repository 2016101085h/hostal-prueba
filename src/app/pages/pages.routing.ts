import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { RolesComponent } from './roles/roles.component';
import { TipoHabitacionComponent } from './tipo-habitacion/tipo-habitacion.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { SelectHabitacionComponent } from './select-habitacion/select-habitacion.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { CheckoutProcesarComponent } from './checkout-procesar/checkout-procesar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HabitacionOcupadaComponent } from './habitacion-ocupada/habitacion-ocupada.component';
import { VenderComponent } from './vender/vender.component';
import { VentaDiariaComponent } from './venta-diaria/venta-diaria.component';
import { ContentPruebaComponent } from './content-prueba/content-prueba.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { VentaMensualComponent } from './venta-mensual/venta-mensual.component';


const routes: Routes = [
  {path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ContentPruebaComponent, data: {titulo: 'Dashboard'}},
      { path: 'roles', component: RolesComponent , data: {titulo: 'Roles'}},
      { path: 'tipoHabitacion', component: TipoHabitacionComponent , data: {titulo: 'Tipo de habitacion'}},
      { path: 'habitacion', component: HabitacionComponent , data: {titulo: 'Habitacion'}},
      { path: 'seleccionar-habitacion', component: SelectHabitacionComponent , data: {titulo: 'Seleccionar Habitacion'}},
      { path: 'seleccionar-habitacion/:id', component: RecepcionComponent , data: {titulo: 'Seleccionar Habitacion rec'}},
      { path: 'clientes', component: ClientesComponent , data: {titulo: 'Clientes'}},
      { path: 'productos', component: ProductosComponent , data: {titulo: 'Productos'}},
      { path: 'categorias', component: CategoriasComponent , data: {titulo: 'Categorias'}},
      { path: 'habitaciones-ocupadas', component: HabitacionOcupadaComponent , data: {titulo: 'Habitaciones ocupadas'}},
      { path: 'habitaciones-ocupadas-vender/:id', component: VenderComponent , data: {titulo: 'Habitaciones ocupadas vender'}},
      { path: 'checkout', component: CheckoutComponent , data: {titulo: 'Checkout'}},
      { path: 'checkout-procesar/:habitacion_id', component: CheckoutProcesarComponent , data: {titulo: 'Checkout habitacion'}},
      { path: 'venta-diaria', component: VentaDiariaComponent , data: {titulo: 'Venta diaria'}},
      { path: 'venta-mensual', component: VentaMensualComponent , data: {titulo: 'Venta Mensual'}},
      { path: 'usuarios', component: UsuarioComponent , data: {titulo: 'Usuario'}},
      { path: 'perfil', component: PerfilComponent , data: {titulo: 'Perfil de Usuario'}},

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
