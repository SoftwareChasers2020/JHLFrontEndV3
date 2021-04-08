import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Ville} from '../../../Model/ville';
import {Gouvernorat} from '../../../Model/gouvernorat';
import {Fournisseur} from '../../../Model/fournisseur';
import {Adresse} from '../../../Model/adresse';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../Service/notification.service';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {FournisseurService} from '../../../Service/fournisseur.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription-f',
  templateUrl: './inscription-f.component.html',
  styleUrls: ['./inscription-f.component.css']
})
export class InscriptionFComponent implements OnInit {
  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;
  f: Fournisseur = new Fournisseur();
  adr: Adresse = new Adresse();
  v: Ville = new Ville();
  selectedValue: Ville ;


  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public fournisseurService: FournisseurService,
              private router: Router) {
  }

  formGroup = this.fb.group({
    Nom: ['', Validators.required],
    Prenom: ['', Validators.required],
    NomCommercial: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Tel: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
  }

  onSubmit(): void {
   if (this.formGroup.valid) {
      this.AddFournisseur();
    } else {
      this.validateAllFormFields(this.formGroup);


    }

  }

  changevilleByGovNom(val: any) {

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }


  onClose() {
    this.formGroup.reset();
    this.toHomePage();

  }

  toHomePage(): void {
    this.router.navigate(['']);

  }

  AddFournisseur() {
    this.f.nom = this.Nom.value;
    this.f.prenom = this.Prenom.value;
    this.f.email = this.Email.value;
    this.f.tel = this.Tel.value;
    this.f.nomcommercial = this.NomCommercial.value;
    this.adr.ville = this.selectedValue;
    this.f.adresse = this.adr;
    console.log(this.f);
    this.fournisseurService.createFournisseurFromInscription(this.f)
      .subscribe(data => {
        console.log(data);
        this.formGroup.reset();
        this.notificationService.success('Demande envoyer avec succée! ');
      }, error => console.log(error));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
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


}
