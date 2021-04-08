import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Gouvernorat} from "../../../Model/gouvernorat";
import {Observable} from "rxjs";
import {Fournisseur} from "../../../Model/fournisseur";
import {Adresse} from "../../../Model/adresse";
import { Ville } from 'src/app/Model/ville';
import {FournisseurService} from "../../../Service/fournisseur.service";
import {NotificationService} from "../../../Service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GouvernoratService} from "../../../Service/gouvernorat.service";
import {VilleService} from "../../../Service/ville.service";

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  f: Fournisseur = new Fournisseur();
  adr: Adresse = new Adresse();
  v: Ville = new Ville();
  selectedValue: Ville ;

  constructor(private fb: FormBuilder,
              private fournisseurService: FournisseurService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              ) { }




  get id(){
    return this.formGroup.get('id');
  }

  get Nom() {
    return this.formGroup.get('Nom');
  }

  get Prenom() {
    return this.formGroup.get('Prenom');
  }

  get NomCommercial() {
    return this.formGroup.get('NomCommercial');
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

  get Ville() {
    return this.formGroup.get('Ville');
  }


  formGroup = this.fb.group({
    Nom: ['', Validators.required],
    Login : null,
    Prenom: ['', Validators.required],
    NomCommercial: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Tel: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required)
  });

  ngOnInit(): void {

    this.fournisseurService.getFournisseurById(this.route.snapshot.params.id).subscribe(
     data => {this.f = data as Fournisseur;
              this.formGroup.patchValue(
         {
           id: this.f.idUtilisateur,
           Login: this.f.login,
           Nom: this.f.nom,
           Prenom: this.f.prenom,
           NomCommercial : this.f.nomcommercial,
           Email: this.f.email,
           Tel: this.f.tel,
           Gouvernorat: this.f.adresse.ville.gouvernorat.nom,
           Ville: this.f.adresse.ville.nom
         });
              this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
              this.listville = this.villeService.getVilleByGouvernoratNom(this.f.adresse.ville.gouvernorat.nom);
     },
     err => console.log(err)
   );

  }

  changevilleByGovNom(value: any) {
    this.listville = this.villeService.getVilleByGouvernoratNom(value);

  }

  onSubmit() {
    this.villeService.getVilleByNom(this.Ville.value).subscribe(
      data => {
      //  this.f.idUtilisateur = this.id.value;
        this.f.nomcommercial = this.NomCommercial.value;
        this.f.email = this.Email.value;
        this.f.nom = this.Nom.value;
        this.f.prenom = this.Prenom.value;
        this.f.tel = this.Tel.value;
        this.adr.ville = data;
        this.f.adresse = this.adr;
        this.fournisseurService.updateFournisseur(this.f).subscribe(
          res => {
            console.log(res);
            this.notificationService.success("Modification a effectué avec succées");
            setTimeout(
              // tslint:disable-next-line:only-arrow-functions
              function() {
                location.reload();
              }, 1500);


          }, error => console.log(error)
        );
      }
    );
  }

  retourAccueil() {
    this.router.navigateByUrl("/temp/accueilFournisseur");

  }
}
