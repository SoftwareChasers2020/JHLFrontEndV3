import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gouvernorat} from '../Model/gouvernorat';
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {
  urlpath: string;
  constructor(private http: HttpClient) {
    this.urlpath = environment.apiurlgest+'/Gouvernorat';
    //this.urlpath = 'http://localhost:8080/Gouvernorat';
  }
  getAllAGouvernorat(){
    return this.http.get<Gouvernorat[]>(this.urlpath);
  }

}
