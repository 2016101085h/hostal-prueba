import { Component, OnInit } from '@angular/core';
import { TipoHabitacionService } from '../../services/tipo-habitacion.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario;
  public titulo = '';
  constructor(private th: TipoHabitacionService,
              private us: AuthService,
              private title: Title,
              private router: Router,
              private meta: Meta) {
                this.getDataRoute().subscribe((data) => {
                  // console.log(data);
                  this.titulo = data.titulo;
                  this.title.setTitle(`Admin - ${this.titulo}`);
                  const metaTag: MetaDefinition = {
                    name: 'Description',
                    content: this.titulo
                  }
                  this.meta.addTag(metaTag);
                });
                this.usuario = us.usuario;
               }

  cantidad = 0;
  ngOnInit(): void {
    this.th.getTipoHabitacion().subscribe((resp: any) => {
      this.cantidad = resp.cantidad;
    });
  }
  // tslint:disable-next-line: typedef
  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)

    );
  }

}
