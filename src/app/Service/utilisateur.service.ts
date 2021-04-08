import { Injectable } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(private fb: FormBuilder,
              private http: HttpClient) {
    this.urlpath = 'http://localhost:8080/Utilisateur';
  }


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
  urlpath: string;

  formGroup = this.fb.group({
    id: [null],
    Nom: ['', Validators.required],
    Login: ['', Validators.required],
    Password: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(30)]],
    ConfirmPassword: ['', [Validators.required ]],
    Prenom: ['', Validators.required],
    NomCommercial: ['', Validators.required, [this.validateNomCommercialNotTaken.bind(this)]],
    Email: ['', [Validators.email, Validators.required]],
    Tel: ['', [Validators.required, Validators.pattern('[0-9 ]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required)
  }, { validator: this.passwordMatchValidator('Password', 'ConfirmPassword')});

  getUtilisateurById(id: any){
    return this.http.get(this.urlpath + '/' + id);

  }
  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: any) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  validateNomCommercialNotTaken(control: AbstractControl) {

    return  this.checkNomCommercialNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { NomCommercialTaken: true };
      })
    );
  }

  checkNomCommercialNotTaken(nomcommercial: string): Observable<boolean> {


    return  this.http.get('http://localhost:8080/Fournisseur').pipe(
      map((res: any) => {
          return res.filter((user: { nomcommercial: string; }) => user.nomcommercial === nomcommercial);
        }
      ),
      map(users => !users.length)
    );
  }



}
