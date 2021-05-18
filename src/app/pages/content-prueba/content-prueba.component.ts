import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
declare var $: any;
// import { isBs3 } from 'ngx-bootstrap/utils';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-content-prueba',
  templateUrl: './content-prueba.component.html',
  styleUrls: ['./content-prueba.component.css']
})
export class ContentPruebaComponent implements OnInit {

  modalRef: BsModalRef;
  usuario: Usuario;
  datos: any;
  constructor(private modalService: BsModalService,
              private auth: AuthService,
              private router: Router,
              private usuario_s:  UsuarioService) {
    this.usuario = auth.usuario;
  }

  // tslint:disable-next-line: typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.usuario_s.getCantidades().subscribe((resp: any) => {
      // console.log(resp);
      this.datos = resp
    })

      if (this.usuario.imagen === 'usuario-no-image.jpg'){
        Swal.fire({
          title: '<strong>Perfil Imcompleto</strong>',
          icon: 'warning',
          html:
            'Por favor dirigerese a la sección de Perfil, ' +
            'para actualizar su imagen',
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText:
          '<i class="font-icon font-icon-user" </i> Ir a su perfil!',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          this.router.navigate(['/dashboard/perfil'])

        });
      }

    // tslint:disable-next-line: only-arrow-functions
    // tslint:disable-next-line: typedef
    $(document).ready(() => {
      const modalContent: any = $('.modal-content');
      modalContent.draggable({
        handle: '.modal-header',
        revert: true,
        revertDuration: 300
      });
    });
  }
}


