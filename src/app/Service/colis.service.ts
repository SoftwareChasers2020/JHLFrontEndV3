import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Administrateur} from '../Model/administrateur';

@Injectable({
  providedIn: 'root'
})
export class ColisService {
  urlpath: string;
  constructor(private http: HttpClient) {

    this.urlpath = 'http://localhost:8081/colis';
  }

  getCompteur()
  {
    return this.http.get(this.urlpath + "/compteur/1");
  }

/*  createColis(c: Col){

    return this.http.post(this.urlpath, a);
  }*/
}
