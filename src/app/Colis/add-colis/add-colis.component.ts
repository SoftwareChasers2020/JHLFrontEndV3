import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Ville} from "../../Model/ville";
import {Gouvernorat} from "../../Model/gouvernorat";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {GouvernoratService} from "../../Service/gouvernorat.service";
import {VilleService} from "../../Service/ville.service";
import {Compteur} from '../../Model/compteur';
import {ColisService} from '../../Service/colis.service';

@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css']
})
export class AddColisComponent implements OnInit {
  c: Compteur;

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
    nbArticleEchange: ['', Validators.required],
    AdressDispo : ['', Validators.required],
    Prix : ['', Validators.required],
    select : new FormControl('', Validators.required)

  });
  value = null;
  constructor(private fb: FormBuilder,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              private colisService: ColisService) { }

  ngOnInit(): void {
    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
    this.colisService.getCompteur().subscribe(
      data => {
        this.c = data as Compteur;
        this.CodeBarre.setValue(this.c.lastCodeBarre);
      }

    );
  }

  onSubmit() {

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
  get nbArticleEchange() {
    return this.formGroup.get('nbArticleEchange');
  }


  test(value: Event) {
    console.log(this.value);
  }
}
