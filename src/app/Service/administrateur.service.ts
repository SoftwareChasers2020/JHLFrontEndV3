import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Administrateur} from '../Model/administrateur';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {
  urlpath: string;
  constructor(private http: HttpClient)
  {
      this.urlpath = environment.apiurlgest+'/Administrateur';
    //  this.urlpath = 'http://localhost:8080/Administrateur';
  }


    getAllAAdministrateur() {

     return this.http.get<Administrateur[]>(this.urlpath);

   }

    getAdministrateurById(id: number){
    return this.http.get(this.urlpath + '/' + id);

  }

    createAdministrateur(a: Administrateur){



    return this.http.post(this.urlpath, a);
  }
    updateAdministrateur(a: Administrateur) {
    return this.http.put(this.urlpath, a);

  }
    deleteAdministrateur(id: number){
    return this.http.delete(this.urlpath + '/' + id);

  }



}
