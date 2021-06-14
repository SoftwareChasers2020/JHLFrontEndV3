import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {FormBuilder, FormControl, Validators} from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Ville} from 'src/app/Model/ville';
import {GestionnaireDepot} from '../../../Model/GestionnaireDepot';
import {Adresse} from '../../../Model/adresse';
import {Gouvernorat} from 'src/app/Model/gouvernorat';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {GestionnaireDepotService} from '../../../Service/gestionnaireDepot.service';


@Component({
  selector: 'app-edit-gestionnaire-depot',
  templateUrl: './edit-gestionnaire-depot.component.html',
  styleUrls: ['./edit-gestionnaire-depot.component.css']
})
export class EditGestionnaireDepotComponent implements OnInit {

  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  gd: GestionnaireDepot = new GestionnaireDepot();
  adr: Adresse = new Adresse();
  step = 0;
  row: GestionnaireDepot;
  hide = true;
  hidec = true;


  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public GDService: GestionnaireDepotService,
              public dialogRef: MatDialogRef<EditGestionnaireDepotComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.row = data;
    console.log(this.row);
  }


  ngOnInit(): void {

    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
    this.listville = this.villeService.getVilleByGouvernoratNom(this.row.adresse.ville.gouvernorat.nom);
    this.setSlideToggleValue();
    this.GDService.formGroup.patchValue(
      {
        id: this.row.idUtilisateur,
        Login: this.row.login,
        Nom: this.row.nom,
        Prenom: this.row.prenom,
        Password: this.row.password,
        Email: this.row.email,
        Tel: this.row.tel,
        dateEmbauche: this.row.date_embauche,
        Gouvernorat: this.row.adresse.ville.gouvernorat.nom,
        Ville: this.row.adresse.ville.nom
      });


  }

  setSlideToggleValue() {
    if (this.row.active === 2 || this.row.active === 0) {
      this.GDService.formGroup.patchValue(
        {
          Active: false
        }
      );
    } else {
      this.GDService.formGroup.patchValue(
        {
          Active: true
        }
      );
    }
  }

  onsubmit() {

    this.villeService.getVilleByNom(this.GDService.Ville.value).subscribe(
      data => {
        this.gd.idUtilisateur = this.GDService.formGroup.get('id').value;
        this.gd.login = this.GDService.formGroup.get('Login').value;
        this.gd.prenom = this.GDService.formGroup.get('Prenom').value;
        this.gd.nom = this.GDService.formGroup.get('Nom').value;
        this.gd.password = this.GDService.formGroup.get('Password').value;
        this.gd.tel = this.GDService.formGroup.get('Tel').value;
        this.gd.email = this.GDService.formGroup.get('Email').value;
        this.gd.date_embauche = this.GDService.formGroup.get('dateEmbauche').value;
        this.adr.ville = data;
        this.gd.adresse = this.adr;
        if (this.GDService.Active.value === true) {
          this.gd.active = 1;
        } else {
          this.gd.active = 2;
        }
        this.GDService.updateGestionnaireDepot(this.gd).subscribe(
          res => {
            console.log(res);
            this.dialogRef.close();
            /*            setTimeout(
                          // tslint:disable-next-line:only-arrow-functions
                          function(){
                            location.reload();
                          }, 500);*/
            this.notificationService.success("Modification a effectué avec succées");

          }, error => console.log(error)
        );

      });
  }


  changevilleByGovNom(val: any) {

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }


  onClose() {
    this.GDService.formGroup.reset();
    this.dialogRef.close();
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }


  onClear() {
    this.GDService.formGroup.reset();

  }
}
