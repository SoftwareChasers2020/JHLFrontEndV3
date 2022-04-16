import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Livreur} from '../../Model/livreur';
import {FeuilleDeRoute} from '../../Model/GestColis/feuille-de-route';
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class FeuillerouteService {
  urlpath: string;
  constructor(private http: HttpClient)
  {
    this.urlpath = environment.apiurl+"/FeuilleRoutes";
   // this.urlpath = 'http://localhost:8081/FeuilleRoutes';
  }


  getAllFeuilleroutes() {

    return this.http.get<FeuilleDeRoute[]>(this.urlpath);

  }

  getFeuillerouteById(id: number){
    return this.http.get(this.urlpath + '/' + id);

  }

  createFeuilleroute(f: FeuilleDeRoute){

    return this.http.post(this.urlpath, f);
  }
  updateFeuilleroute(f: FeuilleDeRoute) {
    return this.http.put(this.urlpath, f);

  }
  deleteFeuilleroute(id: number){
    return this.http.delete(this.urlpath + '/' + id);

  }

}
