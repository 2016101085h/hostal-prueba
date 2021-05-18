import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
// tslint:disable-next-line: max-line-length
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService,
              private router: Router) {}
  canActivate(): any {
    // if (this.auth.estaAutenticado()){
    //   return true;
    // }else{
    //   this.router.navigate(['/auth/login']);
    //   return false;

    return this.auth.validarToken().pipe(
      tap(isAutenticado => {
        console.log(isAutenticado);
        if (!isAutenticado){
          this.router.navigateByUrl('auth/login');
        }
      })
    );
    // }
  }


}
