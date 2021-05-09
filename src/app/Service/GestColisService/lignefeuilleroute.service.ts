import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Livreur} from '../../Model/livreur';
import {FeuilleDeRoute} from '../../Model/GestColis/feuille-de-route';
import {LigneFeuilleRoute} from '../../Model/GestColis/ligne-feuille-route';

@Injectable({
  providedIn: 'root'
})
export class LignefeuillerouteService {

  urlpath: string;

  constructor(private http: HttpClient)
  {
    this.urlpath = 'http://localhost:8081/LigneFeuilleRoutes';
  }

  getAllLignefeuilleroutes() {

    return this.http.get<LigneFeuilleRoute[]>(this.urlpath);

  }

  getLignefeuillerouteById(id: number){
    return this.http.get(this.urlpath + '/' + id);

  }

  createLignefeuilleroute(f: LigneFeuilleRoute){

    return this.http.post(this.urlpath, f);
  }
  updateLignefeuilleroute(f: LigneFeuilleRoute) {
    return this.http.put(this.urlpath, f);

  }
  deleteLignefeuilleroute(id: number){
    return this.http.delete(this.urlpath + '/' + id);

  }

  SaveAllLignFeuilleRoute(listLigneFeuilleRoute: LigneFeuilleRoute[])
  {
    return this.http.post(this.urlpath + "/saveAllLigne/" , listLigneFeuilleRoute );
  }
}
