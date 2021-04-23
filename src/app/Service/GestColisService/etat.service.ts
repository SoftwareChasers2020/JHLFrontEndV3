import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Etat} from '../../Model/GestColis/etat';

@Injectable({
  providedIn: 'root'
})
export class EtatService {
  urlpath: string;
  constructor(private http: HttpClient) {

    this.urlpath = 'http://localhost:8081/etats/';
  }

  getEtatById(id){
    return this.http.get<Etat>(this.urlpath + id);
  }

  getAllEtat(){
    return this.http.get<Etat[]>(this.urlpath);
  }
  findEtatByTitre(titre)
  {
  return this.http.get<Etat>(this.urlpath + "Bytitre/" + titre);
  }
}
