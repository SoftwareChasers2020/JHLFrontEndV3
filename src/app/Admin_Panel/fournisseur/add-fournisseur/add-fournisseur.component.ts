import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Adresse} from '../../../Model/adresse';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {UtilisateurService} from '../../../Service/utilisateur.service';

import {Fournisseur} from '../../../Model/fournisseur';
import {Ville} from '../../../Model/ville';
import {Gouvernorat} from '../../../Model/gouvernorat';
import { MatDialogRef } from '@angular/material/dialog';
import {FournisseurService} from '../../../Service/fournisseur.service';


@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {

  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  adr: Adresse = new Adresse();
  selectedValue: Ville;
  step = 0;
  f: Fournisseur = new Fournisseur();
  constructor(private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public utilisateurService: UtilisateurService,
              public fournisseurService: FournisseurService,
              public dialogRef: MatDialogRef<AddFournisseurComponent>
  ) { }

 hide = true;
  hidec = true;


  ngOnInit(): void {

    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();

  }

  onsubmit() {
  if (this.utilisateurService.formGroup.valid) {
      this.AddFournisseur();
     // this.dialogRef.close();
    }else {
      this.validateAllFormFields(this.utilisateurService.formGroup);
    }
  }

  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }
AddFournisseur() {
  this.f.login = this.utilisateurService.Login.value;
  this.f.nomcommercial = this.utilisateurService.NomCommercial.value;
  this.f.email = this.utilisateurService.Email.value;
  this.f.password = this.utilisateurService.Password.value;
  this.f.nom = this.utilisateurService.Nom.value;
  this.f.prenom = this.utilisateurService.Prenom.value;
  this.f.tel = this.utilisateurService.Tel.value;
  this.adr.ville = this.selectedValue;
  this.f.adresse = this.adr;
  console.log(this.f);
  this.fournisseurService.createFournisseur(this.f).subscribe(
    data => {
      console.log(data);
     /* setTimeout(
        // tslint:disable-next-line:only-arrow-functions
        function(){
          location.reload();
        }, 500);*/
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

