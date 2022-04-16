import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Etat} from '../../Model/GestColis/etat';
import {Colis} from '../../Model/GestColis/colis';
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class EtatService {
  urlpath: string;
  constructor(private http: HttpClient) {
    this.urlpath = environment.apiurl+"/etats/";
   // this.urlpath = 'http://localhost:8081/etats/';
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
