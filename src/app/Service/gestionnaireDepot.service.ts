import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GestionnaireDepot} from '../Model/gestionnaireDepot';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UtilisateurService} from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class GestionnaireDepotService {
  urlpath: string;
  constructor(private http: HttpClient, private utilisateurService: UtilisateurService, private fb: FormBuilder)
  {
    this.urlpath = 'http://localhost:8080/GestionnaireDepot';
  }



  formGroup = this.fb.group({
    id: [null],
    Nom: ['', Validators.required],
    Login: ['', Validators.required],
    Password: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(30)]],
    ConfirmPassword: ['', [Validators.required ]],
    Prenom: ['', Validators.required],
    dateEmbauche: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Tel: ['', [Validators.required, Validators.pattern('[0-9 ]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required)
  }, { validator: this.utilisateurService.passwordMatchValidator('Password', 'ConfirmPassword')});


  get id(){
    return this.formGroup.get('id');
  }

  get Nom(){
    return this.formGroup.get('Nom');
  }

  get Prenom(){
    return this.formGroup.get('Prenom');
  }
  get Tel() {
    return this.formGroup.get('Tel');
  }
  get Email(){
    return this.formGroup.get('Email');
  }
  get Gouvernorat(){
    return this.formGroup.get('Gouvernorat');
  }

  get Login(){
    return this.formGroup.get('Login');
  }
  get dateEmbauche(){
    return this.formGroup.get('dateEmbauche');
  }
  get Password(){
    return this.formGroup.get('Password');
  }
  get Ville(){
    return this.formGroup.get('Ville');
  }
  get ConfirmPassword(){
    return this.formGroup.get('ConfirmPassword');
  }



  getAllGestionnaireDepots() {

    return this.http.get<GestionnaireDepot[]>(this.urlpath);

  }

  getGestionnaireDepotById(id: number){
    return this.http.get(this.urlpath + '/' + id);

  }

  createGestionnaireDepot(g: GestionnaireDepot){

    return this.http.post(this.urlpath, g);
  }
  updateGestionnaireDepot(g: GestionnaireDepot) {
    return this.http.put(this.urlpath, g);

  }
  deleteGestionnaireDepot(id: number){
    return this.http.delete(this.urlpath + '/' + id);

  }



}
