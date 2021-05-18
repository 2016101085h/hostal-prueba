import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  constructor(private auth: AuthService,
              private router: Router) {
    this.usuario = auth.usuario;
               }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  logout(){
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

}
