import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {TokenStorageService} from '../token-storage.service';
import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    //
    if (token != null && ((authReq.url.indexOf('https://fcm.googleapis.com/fcm/send') === 0) || (authReq.url.indexOf('https://iid.googleapis.com/iid/v1/') === 0) || (authReq.url.indexOf('https://iid.googleapis.com/iid/info/') === 0))) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'key=AAAAb6QT_jM:APA91bGE4DLL0QIuvuroyYES7nDv4RPPmWrw_zyThVXNEQKYavIFEvym4g7z3ZpFhi8Ld2DmViCj5Ix4pwJxau7MfPlMjThPxU_9dzwQbLXR4ltCDGB0nLKbCzVIxz7DKR6KUSZbeOye')});
      return next.handle(authReq);
    }else if (token == null && ((authReq.url.indexOf('http://localhost:8080/apigest/Gouvernorat') === 0) || (authReq.url.indexOf('http://localhost:8080/apigest/Ville') === 0) || (authReq.url.indexOf('http://localhost:8080/apigest/Fournisseur/createFournisseur') === 0) ))
    {
      delete req.headers['Authorization'];
      return next.handle(req);
    } else {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
      return next.handle(authReq);
    }

  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
