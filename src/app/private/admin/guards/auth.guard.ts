import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = localStorage.getItem('token');
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
      if (decodedToken.length != 0) {
        return true;
      } else {
        localStorage.removeItem('token');
        this._router.navigate(['/admin/login']);
        return false;
      }
    } else {
      this._router.navigate(['/admin/login']);
      return false;
    }
  }
}
