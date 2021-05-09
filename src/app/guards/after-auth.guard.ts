
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../Service/Security/token-storage.service";
import {AuthService} from "../Service/Security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {

  }
   tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // tslint:disable-next-line:new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.tokenStorage.getToken();
    if (token) {
      this.router.navigateByUrl("/temp");
      return false;
    }

    return true;
  }

}
