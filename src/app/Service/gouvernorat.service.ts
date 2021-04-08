import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gouvernorat} from '../Model/gouvernorat';

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {
  urlpath: string;
  constructor(private http: HttpClient) {
    this.urlpath = 'http://localhost:8080/Gouvernorat';
  }
  getAllAGouvernorat(){
    return this.http.get<Gouvernorat[]>(this.urlpath);
  }

}
