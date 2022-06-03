import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../../Model/login";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../../environments/environment";

const  AUTH_API = environment.apiurlgest;
/*const AUTH_API = 'http://localhost:8080';*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenStorage.loggedIn());
  authStatus = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  islogin = false;

  login(l: Login): Observable<any>
  {
    return this.http.post(AUTH_API + "/login", l);
  }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }










}
