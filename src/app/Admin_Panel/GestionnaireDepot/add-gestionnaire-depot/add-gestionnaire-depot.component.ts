import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {MatDialogRef} from '@angular/material/dialog';
import {GestionnaireDepot} from '../../../Model/GestionnaireDepot';
import {Adresse} from '../../../Model/adresse';
import { Ville } from 'src/app/Model/ville';
import { Gouvernorat } from 'src/app/Model/gouvernorat';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {GestionnaireDepotService} from '../../../Service/gestionnaireDepot.service';


@Component({
  selector: 'app-add-gestionnaire-depot',
  templateUrl: './add-gestionnaire-depot.component.html',
  styleUrls: ['./add-gestionnaire-depot.component.css']
})
export class AddGestionnaireDepotComponent implements OnInit {
  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  gd: GestionnaireDepot = new GestionnaireDepot();
  adr: Adresse = new Adresse();
  v: Ville = new Ville();
  selectedValue: Ville;
  step = 0;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public GDService: GestionnaireDepotService,
              public dialogRef: MatDialogRef<AddGestionnaireDepotComponent>,
  ) { }


  hide = true;
  hidec = true;



  ngOnInit(): void {

    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();

  }

  onsubmit() {
    if (this.GDService.formGroup.valid) {
      this.AddGestionnaireDepot();
      this.dialogRef.close();

    }else {
   this.validateAllFormFields(this.GDService.formGroup);

    }
  }

  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }



  AddGestionnaireDepot(){
    this.gd.login = this.GDService.Login.value;
    this.gd.email = this.GDService.Email.value;
    this.gd.password = this.GDService.Password.value;
    this.gd.nom = this.GDService.Nom.value;
    this.gd.prenom = this.GDService.Prenom.value;
    this.gd.tel = this.GDService.Tel.value;
    this.gd.date_embauche = this.GDService.dateEmbauche.value;
    this.adr.ville = this.selectedValue;
    this.gd.adresse = this.adr;
    console.log(this.gd);
    this.GDService.createGestionnaireDepot(this.gd)
      .subscribe(data =>
      {
/*        console.log(data);
        this.notificationService.success("Ajout effectué avec succées");
        setTimeout(
          // tslint:disable-next-line:only-arrow-functions
          function(){
            location.reload();
          }, 1500);*/
        this.dialogRef.close();
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
    this.GDService.formGroup.reset();
    this.dialogRef.close();
  }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }
/*
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
  get DateEmbauche(){
    return this.formGroup.get('DateEmbauche');
  }
  get Ville(){
    return this.formGroup.get('Ville');
  }
  get ConfirmPassword(){
    return this.formGroup.get('ConfirmPassword');
  }
*/
  onClear() {
    this.GDService.formGroup.reset();

  }

}
