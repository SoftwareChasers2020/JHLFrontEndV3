import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Administrateur} from '../../../Model/administrateur';
import {Adresse} from '../../../Model/adresse';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {AdministrateurService} from '../../../Service/administrateur.service';
import {UtilisateurService} from '../../../Service/utilisateur.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Gouvernorat } from 'src/app/Model/gouvernorat';
import { Ville } from 'src/app/Model/ville';
import {Fournisseur} from '../../../Model/fournisseur';
import {FournisseurService} from '../../../Service/fournisseur.service';

@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.css']
})
export class EditFournisseurComponent implements OnInit {

  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  f: Fournisseur = new Fournisseur();
  adr: Adresse = new Adresse();
  step = 0;
  row: Fournisseur;
  hide =  true;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public utilisateurService: UtilisateurService,
              public fournisseurService: FournisseurService,
              public dialogRef: MatDialogRef<EditFournisseurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.row = data;

  }




  ngOnInit(): void {
   this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
   this.listville = this.villeService.getVilleByGouvernoratNom(this.row.adresse.ville.gouvernorat.nom);

   this.utilisateurService.formGroup.patchValue(
      {
        id: this.row.idUtilisateur,
        Login: this.row.login,
        Nom: this.row.nom,
        Prenom: this.row.prenom,
        NomCommercial : this.row.nomcommercial,
        Password: this.row.password,
        Email: this.row.email,
        Tel: this.row.tel,
        Gouvernorat: this.row.adresse.ville.gouvernorat.nom,
        Ville: this.row.adresse.ville.nom
      });


  }

   onsubmit() {

    this.villeService.getVilleByNom(this.utilisateurService.Ville.value).subscribe(
       data => {
         this.f.idUtilisateur = this.utilisateurService.id.value;
         this.f.login = this.utilisateurService.Login.value;
         this.f.nomcommercial = this.utilisateurService.NomCommercial.value;
         this.f.email = this.utilisateurService.Email.value;
         this.f.password = this.utilisateurService.Password.value;
         this.f.nom = this.utilisateurService.Nom.value;
         this.f.prenom = this.utilisateurService.Prenom.value;
         this.f.tel = this.utilisateurService.Tel.value;
         this.adr.ville = data;
         this.f.adresse = this.adr;
         this.fournisseurService.updateFournisseur(this.f).subscribe(
           res => {
             console.log(res);
             this.dialogRef.close();
             setTimeout(
               // tslint:disable-next-line:only-arrow-functions
               function() {
                 location.reload();
               }, 500);
             this.notificationService.success("Modification a effectué avec succées");

           }, error => console.log(error)
         );
           }
         );


   }


   changevilleByGovNom(val: any) {

     this.listville = this.villeService.getVilleByGouvernoratNom(val);
   }


   onClose() {
     this.utilisateurService.formGroup.reset();
     this.dialogRef.close();
   }


   setStep(index: number) {
     this.step = index;
   }

   nextStep() {
     this.step++;
   }


   onClear() {
     this.utilisateurService.formGroup.reset();

   }
}
