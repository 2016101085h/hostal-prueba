import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// tslint:disable-next-line: typedef
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    // frankserranobasilio@gmail.com
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });
  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    init_plugins();
    if (localStorage.getItem('email')) {
      this.loginForm.get('email').setValue(localStorage.getItem('email'));
      this.loginForm.get('remember').setValue(true);
    }
  }

  // tslint:disable-next-line: typedef
  login(){
    if (this.loginForm.invalid){
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    // console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe((resp: any) => {
      // console.log(resp);
      if (!resp.status) {
        Swal.fire({
          icon: 'error',
          title: 'Error al utenticar',
          text: resp.msg
        });
      }else{
        if (resp.status){
          Swal.close();
          if (this.loginForm.value.remember) {
            // console.log('hola');
            localStorage.setItem('email', this.loginForm.value.email);
          }else{
            localStorage.removeItem('email');
          }
          console.log(resp);
          this.router.navigate(['/dashboard']);
        }
      }

    });
  }


}
