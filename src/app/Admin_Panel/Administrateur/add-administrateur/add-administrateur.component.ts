import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Ville} from '../../../Model/ville';
import {Gouvernorat} from '../../../Model/gouvernorat';

import {Adresse} from '../../../Model/adresse';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {AdministrateurService} from '../../../Service/administrateur.service';
import {Administrateur} from '../../../Model/administrateur';
import {NotificationService} from '../../../Service/notification.service';
import {UtilisateurService} from '../../../Service/utilisateur.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-administrateur',
  templateUrl: './add-administrateur.component.html',
  styleUrls: ['./add-administrateur.component.css']
})
export class AddAdministrateurComponent implements OnInit {

  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  a: Administrateur = new Administrateur();
  adr: Adresse = new Adresse();
  v: Ville = new Ville();
  selectedValue: Ville;
  step = 0;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              private administrateurService: AdministrateurService,
              private utilisateurService: UtilisateurService,
              public dialogRef: MatDialogRef<AddAdministrateurComponent>,
  ) { }


  formGroup = this.fb.group({
    id: [null],
    Nom: ['', Validators.required],
    Login: ['', Validators.required],
    Password: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(30)]],
    ConfirmPassword: ['', [Validators.required ]],
    Prenom: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Tel: ['', [Validators.required, Validators.pattern('[0-9 ]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required)
  }, { validator: this.utilisateurService.passwordMatchValidator('Password', 'ConfirmPassword')});
  hide = true;
  hidec = true;


  ngOnInit(): void {

    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();

  }

 onsubmit() {
   if (this.formGroup.valid) {
     this.AddAdministrateur();
     this.dialogRef.close();
     }else {
     this.validateAllFormFields(this.formGroup);
   }
 }

  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }
 /* checkPasswords(group: FormGroup) {

    const pass = group.get('Password').value;

    const confirmPass = group.get('ConfirmPassword').value;

    return pass === confirmPass ? null : { passwordMismatch: true };
  }*/


  AddAdministrateur(){

    this.adr.ville = this.selectedValue;
    this.a.adresse = this.adr;
    console.log(this.a);
    this.administrateurService.createAdministrateur(this.a)
      .subscribe(data =>
      {
        console.log(data);
        setTimeout(
          // tslint:disable-next-line:only-arrow-functions
          function(){
            location.reload();
          }, 500);
        this.notificationService.success("Ajout effectué avec succées");
      }, error => console.log(error));
  }

  validateAllFormFields(formGroup: FormGroup)
  {Object.keys(formGroup.controls).forEach(field =>
  {const control = formGroup.get(field);
   if (control instanceof FormControl)
    {control.markAsTouched({ onlySelf: true }); }
    else if (control instanceof FormGroup)
    {this.validateAllFormFields(control); }});
  }


  onClose() {
  this.formGroup.reset();
  this.dialogRef.close();
  }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
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
  get ConfirmPassword(){
    return this.formGroup.get('ConfirmPassword');
  }

  onClear() {
    this.formGroup.reset();

  }
}

