import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubida: File;
  public imgTemp: any;
  public disabled = false;
  constructor(private formbiulder: FormBuilder,
              private us: AuthService,
              private usuarioService: UsuarioService) {
                this.usuario = us.usuario;
               }

  ngOnInit(): void {
    this.perfilForm = this.formbiulder.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, Validators.required],
      num_documento: [this.usuario.num_documento, Validators.required],
      celular: [this.usuario.celular, Validators.required],
      rol: [this.usuario.rol, Validators.required],
      rol_id: [this.usuario.rol, Validators.required],
      password: [this.usuario.password],
      password2: [],
      imagen: [this.usuario.imagen],
      id: ['']

    });
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  cambiarImagen(file: File){
    this.imagenSubida = file;
    // console.log(file);
    if (!file){
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      this.imgTemp = reader.result;
    };
  }
  // tslint:disable-next-line: typedef
  actualizarPerfil(){
    this.perfilForm.get('imagen').setValue(this.imgTemp);
    this.perfilForm.get('rol_id').setValue(this.usuario.rol_id);
    this.perfilForm.get('id').setValue(this.usuario.id);
    console.log(this.perfilForm.value);
    Swal.fire({
      title: 'Esta seguro de actualizar su Perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!!!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Actualizado!',
          'Tu perfil ha sido actualizado exitosamente.',
          'success'
          );
        this.usuarioService.actulizarUsuario(this.perfilForm.value).subscribe((resp: any) => {
          this.usuario.imagen = resp.imagen;
          this.usuario.nombre = resp.nombre;
        });
      }
    });
  }
  // tslint:disable-next-line: typedef
  validarContrasena(){
    if (this.perfilForm.value.password !== this.perfilForm.value.password2){
      return true;
    }else{
      return false;
    }
  }

}
