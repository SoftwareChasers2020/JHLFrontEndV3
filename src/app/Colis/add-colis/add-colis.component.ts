import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Ville} from "../../Model/ville";
import {Gouvernorat} from "../../Model/gouvernorat";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {GouvernoratService} from "../../Service/gouvernorat.service";
import {VilleService} from "../../Service/ville.service";
import {Compteur} from '../../Model/GestColis/compteur';
import {ColisService} from '../../Service/colis.service';
import {Colis} from '../../Model/GestColis/colis';
import {FournisseurService} from '../../Service/fournisseur.service';
import {TokenStorageService} from '../../Service/Security/token-storage.service';
import {Client} from '../../Model/GestColis/client';

@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css']
})
export class AddColisComponent implements OnInit {
  c: Compteur;
  colis: Colis = new Colis();
  client: Client = new Client();
  ville: Ville;
  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;

  formGroup = this.fb.group({
    CodeBarre : ['', Validators.required],
    Nom: ['', Validators.required],
    Prenom: ['', Validators.required],
    Tel1: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    Tel2: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required),
    Designation: ['', Validators.required],
    NbArticle: ['', Validators.required],
    Commentaire : ['', Validators.required],
    DesignationEchange: ['', Validators.required],
    NbArticleEchange: ['', Validators.required],
    AdressDispo : ['', Validators.required],
    Prix : ['', Validators.required],
    select : new FormControl('', Validators.required)

  });


  constructor(private fb: FormBuilder,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              private colisService: ColisService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();

  }

  onSubmit() {


    this.ville = this.Ville.value;
    this.colis.codeBarre = this.CodeBarre.value;
    this.colis.adressDispo = this.AdressDispo.value;
    this.colis.commentaire = this.Commentaire.value;
    this.colis.designation = this.Designation.value;
    this.colis.idFournisseur = this.tokenService.getId();
    this.colis.idVille = this.ville.idVille;
    this.client.nom = this.Nom.value;
    this.client.prenom = this.Prenom.value;
    this.client.tel1 = this.Tel1.value;
    this.client.tel2 = this.Tel2.value;
    this.colis.client = this.client;
    this.colis.nbArticle = this.NbArticle.value;
    this.colis.prix = this.Prix.value;
    if (this.select.value === "oui")
    {
      this.colis.designationEchange = this.DesignationEchange.value;
      this.colis.nbArticleEchange = this.NbArticleEchange.value;
      this.colis.echange = true;
    }else {
      this.colis.designationEchange = null;
      this.colis.nbArticleEchange = null;
      this.colis.echange = false;
    }
    this.colisService.createColis(this.colis).subscribe(
      data => {
        console.log(data);
        this.formGroup.reset();

      },
      error => console.log(error)
    );


  }

  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
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
