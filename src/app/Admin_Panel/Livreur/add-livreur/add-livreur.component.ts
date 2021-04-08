import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Adresse} from '../../../Model/adresse';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {UtilisateurService} from '../../../Service/utilisateur.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Ville} from '../../../Model/ville';
import {Gouvernorat} from '../../../Model/gouvernorat';
import {Livreur} from '../../../Model/livreur';
import {LivreurService} from '../../../Service/livreur.service';

@Component({
  selector: 'app-add-livreur',
  templateUrl: './add-livreur.component.html',
  styleUrls: ['./add-livreur.component.css']
})
export class AddLivreurComponent implements OnInit {
  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  l: Livreur = new Livreur();
  adr: Adresse = new Adresse();
  v: Ville = new Ville();
  selectedValue: Ville;
  step = 0;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public LService: LivreurService,
              public dialogRef: MatDialogRef<AddLivreurComponent>,
  ) { }



  hide = true;
  hidec = true;



  ngOnInit(): void {

    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();

  }

  onsubmit() {
    if (this.LService.formGroup.valid) {

      this.AddLivreur();
      this.dialogRef.close();
    }else {
      this.validateAllFormFields(this.LService.formGroup);
    }
  }

  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }
  AddLivreur(){

    this.adr.ville = this.selectedValue;
    this.l.adresse = this.adr;
    console.log(this.l);
    this.LService.createLivreur(this.l)
      .subscribe(data =>
      {
        console.log(data);
        setTimeout(
          // tslint:disable-next-line:only-arrow-functions
          function(){
            location.reload();
          }, 1500);
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
    this.LService.formGroup.reset();
    this.dialogRef.close();
  }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }


  onClear() {
    this.LService.formGroup.reset();

  }

}
