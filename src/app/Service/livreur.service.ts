import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Livreur} from '../Model/livreur';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UtilisateurService} from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  urlpath: string;

  constructor(private http: HttpClient, private utilisateurService: UtilisateurService, private fb: FormBuilder) {
    this.urlpath = 'http://localhost:8080/Livreur';
  }

  formGroup = this.fb.group({
    id: [null],
    Nom: ['', Validators.required],
    Login: ['', Validators.required],
    Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    ConfirmPassword: ['', [Validators.required]],
    Prenom: ['', Validators.required],
    dateEmbauche: ['', Validators.required],
    NumUrgence: ['', [Validators.required, Validators.pattern('[0-9 ]{8}')]],
    Email: ['', [Validators.email, Validators.required]],
    Tel: ['', [Validators.required, Validators.pattern('[0-9 ]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required),
    Active: new FormControl(null)
  }, {validator: this.utilisateurService.passwordMatchValidator('Password', 'ConfirmPassword')});

  get id() {
    return this.formGroup.get('id');
  }

  get Nom() {
    return this.formGroup.get('Nom');
  }

  get Prenom() {
    return this.formGroup.get('Prenom');
  }

  get Tel() {
    return this.formGroup.get('Tel');
  }

  get Email() {
    return this.formGroup.get('Email');
  }

  get Gouvernorat() {
    return this.formGroup.get('Gouvernorat');
  }

  get dateEmbauche() {
    return this.formGroup.get('dateEmbauche');
  }

  get Login() {
    return this.formGroup.get('Login');
  }

  get Password() {
    return this.formGroup.get('Password');
  }

  get NumUrgence() {
    return this.formGroup.get('NumUrgence');
  }

  get Ville() {
    return this.formGroup.get('Ville');
  }

  get ConfirmPassword() {
    return this.formGroup.get('ConfirmPassword');
  }

  get Active() {
    return this.formGroup.get('Active');
  }

  getActive(value: number): boolean {

    return value === 1;
  }

  getStatut() {
    if (this.Active.value) {
      return "Active";
    }
    return "Desactive";
  }

  getAllLivreurs() {

    return this.http.get<Livreur[]>(this.urlpath);

  }

  getLivreurById(id: number) {
    return this.http.get<Livreur>(this.urlpath + '/' + id);

  }

  createLivreur(l: Livreur) {

    return this.http.post(this.urlpath, l);
  }

  updateLivreur(l: Livreur) {
    return this.http.put(this.urlpath, l);

  }

  deleteLivreur(id: number) {
    return this.http.delete(this.urlpath + '/' + id);

  }

}
