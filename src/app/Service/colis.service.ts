import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Administrateur} from '../Model/administrateur';
import {Colis} from '../Model/GestColis/colis';
import {Compteur} from '../Model/GestColis/compteur';

@Injectable({
  providedIn: 'root'
})
export class ColisService {
  urlpath: string;
  constructor(private http: HttpClient) {

    this.urlpath = 'http://localhost:8081/colis/';
  }



  createColis(c: Colis){

    return this.http.post(this.urlpath, c);
  }

  getAllColis(){
      return this.http.get<Colis[]>(this.urlpath);
  }

  getColisById(id)
  {
    return this.http.get<Colis>(this.urlpath + id);
  }

  deleteColis(id)
  {
    return this.http.delete(this.urlpath + id);
  }

  findByFournisseurIdAndEtat(id)
  {
    return this.http.get(this.urlpath + "findbyIdFournisseur/" + id);
  }

}
