
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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.tokenStorage.getToken();

    if (this.tokenStorage.getRole() === 'Administrateur') {
      this.router.navigateByUrl('/temp');
      return false;

    } else if (this.tokenStorage.getRole() === 'Fournisseur') {
      this.router.navigateByUrl('/temp/accueilFournisseur');

      return false;

    } else if (this.tokenStorage.getRole() === 'GestionnaireDepot') {
      this.router.navigateByUrl('/temp/accueilGestionnaire');
      return false;


    }
    else
    {
      return true;
    }


    /*if (token) {
      this.router.navigateByUrl("/temp");
      return false;
    }

    return true;
  }*/

}}
