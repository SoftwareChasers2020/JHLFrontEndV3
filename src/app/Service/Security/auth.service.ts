import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../../Model/login";
import {map} from "rxjs/operators";
import {TokenStorageService} from "./token-storage.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'http://localhost:8080';
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
    this.islogin = true;
  }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }










}
