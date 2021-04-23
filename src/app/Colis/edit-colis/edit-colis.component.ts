import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {GouvernoratService} from '../../Service/gouvernorat.service';
import {VilleService} from '../../Service/ville.service';
import {ColisService} from '../../Service/GestColisService/colis.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Colis} from '../../Model/GestColis/colis';
import {Client} from '../../Model/GestColis/client';
import { Ville } from 'src/app/Model/ville';
import { Gouvernorat } from 'src/app/Model/gouvernorat';

@Component({
  selector: 'app-edit-colis',
  templateUrl: './edit-colis.component.html',
  styleUrls: ['./edit-colis.component.css']
})
export class EditColisComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              private colisService: ColisService,
              private route: ActivatedRoute,
              private router: Router) { }
  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  colis: Colis = new Colis();
  client: Client = new Client();
  ville: Ville;


  formGroup = this.fb.group({
    CodeBarre : ['', Validators.required],
    Nom: ['', Validators.required],
    Prenom: ['', Validators.required],
    Tel1: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    Tel2: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required),
    Etat: new FormControl('', Validators.required),
    Designation: ['', Validators.required],
    NbArticle: ['', Validators.required],
    Commentaire : ['', Validators.required],
    DesignationEchange: ['', Validators.required],
    NbArticleEchange: ['', Validators.required],
    AdressDispo : ['', Validators.required],
    Prix : ['', Validators.required],
    select : ['', Validators.required]

  });


  ngOnInit(): void {

    this.colisService.getColisById(this.route.snapshot.params.codeBarre).subscribe(
      data => {
        this.colis = data;
        this.villeService.getvilleById(this.colis.idVille)
          .subscribe(
            res => {
              this.formGroup.patchValue(
                {
                  select : this.colis.echange,
                  CodeBarre : this.colis.codeBarre,
                  Nom : this.colis.client.nom,
                  Prenom : this.colis.client.prenom,
                  Tel1 : this.colis.client.tel1,
                  Tel2 : this.colis.client.tel2,
                  Gouvernorat : res.gouvernorat.nom,
                  Ville : res.nom,
                  Designation : this.colis.designation,
                  NbArticle : this.colis.nbArticle,
                  Commentaire : this.colis.commentaire,
                  DesignationEchange : this.colis.designationEchange,
                  NbArticleEchange : this.colis.nbArticleEchange,
                  AdressDispo : this.colis.adressDispo,
                  Prix : this.colis.prix,
                  Etat : this.colis.etat.titre
                }
              );
              this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
              this.listville = this.villeService.getVilleByGouvernoratNom(res.gouvernorat.nom);
            }

          );

      }
    );


  }

  changevilleByGovNom(value: any) {
    this.listville = this.villeService.getVilleByGouvernoratNom(value);

  }
  onSubmit() {

    console.log(this.colis.echange);

    this.villeService.getVilleByNom(this.Ville.value).subscribe(
            data => {
              this.colis.codeBarre = this.CodeBarre.value;
              this.colis.adressDispo = this.AdressDispo.value;
              this.colis.commentaire = this.Commentaire.value;
              this.colis.designation = this.Designation.value;
              this.colis.idVille = data.idVille;
              this.client.nom = this.Nom.value;
              this.client.prenom = this.Prenom.value;
              this.client.tel1 = this.Tel1.value;
              this.client.tel2 = this.Tel2.value;
              this.colis.client = this.client;
              this.colis.nbArticle = this.NbArticle.value;
              this.colis.prix = this.Prix.value;

              if (this.select.value === "true" || this.select.value === true)
              {
                this.colis.designationEchange = this.DesignationEchange.value;
                this.colis.nbArticleEchange = this.NbArticleEchange.value;
                this.colis.echange = true;
              }else {
                this.colis.designationEchange = "";
                this.colis.nbArticleEchange = 0;
                this.colis.echange = false;
              }
              this.colisService.updateColis(this.colis).subscribe(
                res => {
                  console.log(res);
                  this.formGroup.reset();
                  this.router.navigateByUrl("temp/ListColis");

                },
                error => console.log(error)
              );
            },

            error => console.log(error)
          );

        }










  get CodeBarre() {
    return this.formGroup.get('CodeBarre');
  }
  get select() {
    return this.formGroup.get('select');
  }
  get Prix() {
    return this.formGroup.get('Prix');
  }
  get Nom() {
    return this.formGroup.get('Nom');
  }

  get Prenom() {
    return this.formGroup.get('Prenom');
  }
  get Gouvernorat() {
    return this.formGroup.get('Gouvernorat');
  }

  get Ville() {
    return this.formGroup.get('Ville');
  }
  get Etat() {
    return this.formGroup.get('Etat');
  }
  get Tel1() {
    return this.formGroup.get('Tel1');
  }
  get Tel2() {
    return this.formGroup.get('Tel2');
  }
  get Designation() {
    return this.formGroup.get('Designation');
  }
  get NbArticle() {
    return this.formGroup.get('NbArticle');
  }
  get Commentaire() {
    return this.formGroup.get('Commentaire');
  }

  get DesignationEchange() {
    return this.formGroup.get('DesignationEchange');
  }
  get AdressDispo() {
    return this.formGroup.get('AdressDispo');
  }
  get NbArticleEchange() {
    return this.formGroup.get('NbArticleEchange');
  }

}
