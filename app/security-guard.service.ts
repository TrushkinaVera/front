import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth: boolean;
    isAuth = !!localStorage.getItem('currentUser');
    if (!isAuth && state.url.match(/^\/main/ig)) {
      this.router.navigate(['/login']);
      return false;
    } else if ( isAuth && (state.url.match(/^\/(login|register|[]|[*]+)$/ig))) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }

}
