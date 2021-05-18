import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public url = environment.base;
  rows: any = [];
  temp = [];
  users: any = [];
  accion: any;
  datoEnviar: any;
  loading = true;
  constructor(private us: UsuarioService,
              private toast: ToastrService,
              private auth: AuthService) {
     this.us.getUsuarios().subscribe((resp: any) => {
       // console.log('hola', resp);
       console.log( resp);
       // // push our inital complete list
       this.rows = resp.usuario;
       this.users = this.rows;
       this.temp = [...this.users];
       this.loading = false;
       // console.log(this.rows)
     });
  }
  ngOnInit(){}
  // tslint:disable-next-line: use-lifecycle-interface
  // tslint:disable-next-line: typedef
  cargarTabla(event) {
    // const data = {...event};
    // console.log(data);
    this.rows = [...event];
    this.users = [...this.rows];
  }
  // tslint:disable-next-line: typedef
  actualizarUsuario(event){
    // console.log('hola');
    //  const data = [...event];
     this.users = [...event.usuario];

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
    this.users = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  // tslint:disable-next-line: typedef
  eliminarUsuario(Usuario) {
    if (Usuario.id === this.auth.usuario.id){
      Swal.fire(
        'Error!',
        'No puedes eliminarte a ti mismo.',
        'error'
      );
    }else {
      Swal.fire({
        title: 'Estas seguro de Eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.us.eliminarUsuario(Usuario).subscribe((resp) => {
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success'
            );
            // this.rols.splice(indice, 1);
            this.us.getUsuarios().subscribe((respuesta) => {
             this.users = [...respuesta.usuario];
           });
          });
        }

    });
    }
     // console.log(resp);




  }


}
