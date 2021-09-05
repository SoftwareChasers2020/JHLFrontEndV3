import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Administrateur} from '../Model/administrateur';
import {Fournisseur} from '../Model/fournisseur';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UtilisateurService} from './utilisateur.service';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  urlpath: string;
  constructor(private http: HttpClient, private fb: FormBuilder, private utilisateurService: UtilisateurService)
  {
    this.urlpath = 'http://localhost:8080/Fournisseur';
  }



  formGroup = this.fb.group({
    id: [null],
    Nom: ['', Validators.required],
    Login: ['', Validators.required],
    Password: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(30)]],
    ConfirmPassword: ['', [Validators.required ]],
    Prenom: ['', Validators.required],
    NomCommercial: ['', Validators.required],
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

  get Password(){
    return this.formGroup.get('Password');
  }
  get Ville(){
    return this.formGroup.get('Ville');
  }
  get NomCommercial(){
    return this.formGroup.get('NomCommercial');
  }
  get ConfirmPassword(){
    return this.formGroup.get('ConfirmPassword');
  }

  getAllFournisseur() {

    return this.http.get<Fournisseur[]>(this.urlpath);

  }

  getFournisseurById(id: number){
    return this.http.get<Fournisseur>(this.urlpath + '/' + id);

  }

  createFournisseur(f: Fournisseur){

    return this.http.post(this.urlpath, f);
  }
  updateFournisseur(f: Fournisseur) {
    return this.http.put(this.urlpath, f);

  }
  deleteFournisseur(id: number){
    return this.http.delete(this.urlpath + '/' + id);

  }

  createFournisseurFromInscription(f: Fournisseur )
  {
    return this.http.post(this.urlpath + '/createFournisseur', f);
  }

  findAllByOrderByActiveAsc()
  {
    return this.http.get(this.urlpath + '/FournisseursEnAttente');
  }
}
