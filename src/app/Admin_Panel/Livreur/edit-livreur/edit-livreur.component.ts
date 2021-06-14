import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Adresse} from '../../../Model/adresse';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {UtilisateurService} from '../../../Service/utilisateur.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Ville} from '../../../Model/ville';
import {Gouvernorat} from '../../../Model/gouvernorat';
import {Livreur} from '../../../Model/livreur';
import {LivreurService} from '../../../Service/livreur.service';

@Component({
  selector: 'app-edit-livreur',
  templateUrl: './edit-livreur.component.html',
  styleUrls: ['./edit-livreur.component.css']
})
export class EditLivreurComponent implements OnInit {


  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  l: Livreur = new Livreur();
  adr: Adresse = new Adresse();
  step = 0;
  row: Livreur;
  hide = true;
  hidec = true;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public LService: LivreurService,
              public dialogRef: MatDialogRef<EditLivreurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.row = data; }

  ngOnInit(): void {

    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
    this.listville = this.villeService.getVilleByGouvernoratNom(this.row.adresse.ville.gouvernorat.nom);
    this.setSlideToggleValue();
    this.LService.formGroup.patchValue(
      {
        id : this.row.idUtilisateur,
        Login : this.row.login,
        Nom : this.row.nom,
        Prenom : this.row.prenom,
        Password: this.row.password,
        dateEmbauche: this.row.date_embauche,
        Email: this.row.email,
        Tel: this.row.tel,
        NumUrgence: this.row.num_urgence,
        Gouvernorat: this.row.adresse.ville.gouvernorat.nom,
        Ville: this.row.adresse.ville.nom
      });


  }

  onsubmit() {

    this.villeService.getVilleByNom(this.LService.Ville.value).subscribe(
      data => {
        this.l.idUtilisateur = this.LService.id.value;
        this.l.login = this.LService.Login.value;
        this.l.prenom = this.LService.Prenom.value;
        this.l.nom = this.LService.Nom.value;
        this.l.password = this.LService.Password.value;
        this.l.tel =  this.LService.Tel.value;
        this.l.date_embauche = this.LService.dateEmbauche.value;
        this.l.email = this.LService.Email.value;
        this.l.num_urgence = this.LService.NumUrgence.value;
        if (this.LService.Active.value === true) {
          this.l.active = 1;
        } else {
          this.l.active = 2;
        }
        this.adr.ville = data;
        this.l.adresse = this.adr;
        this.LService.updateLivreur(this.l).subscribe(
          res =>
          {
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

  setSlideToggleValue()
  {
    if(this.row.active === 2 || this.row.active === 0)
    {
      this.LService.formGroup.patchValue(
        {
          Active : false
        }
      )
    }
    else
    {
      this.LService.formGroup.patchValue(
        {
          Active : true
        }
      )
    }
  }
  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }

  onClose()
  {
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
