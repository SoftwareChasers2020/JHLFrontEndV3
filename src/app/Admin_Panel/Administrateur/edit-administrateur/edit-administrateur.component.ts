import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Administrateur} from '../../../Model/administrateur';
import {Adresse} from '../../../Model/adresse';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {AdministrateurService} from '../../../Service/administrateur.service';
import {UtilisateurService} from '../../../Service/utilisateur.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Ville } from 'src/app/Model/ville';
import { Gouvernorat } from 'src/app/Model/gouvernorat';


@Component({
  selector: 'app-edit-administrateur',
  templateUrl: './edit-administrateur.component.html',
  styleUrls: ['./edit-administrateur.component.css']
})
export class EditAdministrateurComponent implements OnInit {

  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  a: Administrateur = new Administrateur();
  adr: Adresse = new Adresse();
  step = 0;
  row: Administrateur;
  hide = true;


  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              private administrateurService: AdministrateurService,
              private utilisateurService: UtilisateurService,
              public dialogRef: MatDialogRef<EditAdministrateurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.row = data; }


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


  ngOnInit(): void {
    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
    this.listville = this.villeService.getVilleByGouvernoratNom(this.row.adresse.ville.gouvernorat.nom);

    this.formGroup.patchValue(
      {
        id : this.row.idUtilisateur,
        Login : this.row.login,
        Nom : this.row.nom,
        Prenom : this.row.prenom,
        Password: this.row.password,
        Email: this.row.email,
        Tel: this.row.tel,
        Gouvernorat: this.row.adresse.ville.gouvernorat.nom,
        Ville: this.row.adresse.ville.nom
          });


  }

  onsubmit() {

    this.villeService.getVilleByNom(this.Ville.value).subscribe(
     data => {
       this.a.idUtilisateur = this.formGroup.get('id').value;
       this.a.login = this.formGroup.get('Login').value;
       this.a.prenom = this.formGroup.get('Prenom').value;
       this.a.nom = this.formGroup.get('Nom').value;
       this.a.password = this.formGroup.get('Password').value;
       this.a.tel =  this.formGroup.get('Tel').value;
       this.a.email = this.formGroup.get('Email').value;
       this.adr.ville = data;
       this.a.adresse = this.adr;
       this.administrateurService.updateAdministrateur(this.a).subscribe(
         res =>
       {
         console.log(res);
         this.dialogRef.close();
         setTimeout(
           // tslint:disable-next-line:only-arrow-functions
           function(){
             location.reload();
           }, 500);
         this.notificationService.success("Modification a effectué avec succées");

       }, error => console.log(error)
    );

     });
    }


  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }


  onClose()
  {
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
