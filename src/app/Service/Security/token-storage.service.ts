import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'role-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    window.localStorage.clear();
  }


  public savedata(data: any): void {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, data.id);
    localStorage.setItem(ROLE_KEY, data.role);
  }

  handle(data) {
    this.savedata(data);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getId() {
    return localStorage.getItem(USER_KEY);
  }
  getRole() {
    return localStorage.getItem(ROLE_KEY);
  }
  remove() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  decode(payload) {
    console.log('payload : ', payload);
    return JSON.parse(atob(payload));
  }

  payload(token) {
    const payload = token.split('.')[1];
    console.log('payload : ', payload);
    return this.decode(payload);
  }


  isValid() {
    const token = this.getToken();
    const id = this.getId();

    if (token) {

      const payload = this.payload(token);
      if (payload) {
        return id === payload.id;
      }
    }
    return false;
  }

  getInfos() {

    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }

    return null;
  }


  loggedIn() {
    return this.isValid();
  }


}
