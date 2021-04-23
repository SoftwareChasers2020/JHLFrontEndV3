import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Colis} from '../../Model/GestColis/colis';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Client} from '../../Model/GestColis/client';
import {Ville} from 'src/app/Model/ville';
import {TokenStorageService} from '../Security/token-storage.service';
import {Etat} from '../../Model/GestColis/etat';

@Injectable({
  providedIn: 'root'
})
export class ColisService {
  urlpath: string;
  colis: Colis = new Colis();
  client: Client = new Client();
  ville: Ville;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private tokenService: TokenStorageService) {

    this.urlpath = 'http://localhost:8081/colis/';
  }

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

  addColisFromService()
  {

    this.ville = this.Ville.value;
    this.colis.codeBarre = this.CodeBarre.value;
    this.colis.adressDispo = this.AdressDispo.value;
    this.colis.commentaire = this.Commentaire.value;
    this.colis.designation = this.Designation.value;

    if (this.tokenService.getRole() === "Fournisseur")
    {
      this.colis.etat = new Etat(1, 'En attente de ramassage');
      this.colis.idFournisseur = this.tokenService.getId();
    }
    else {
      this.colis.etat = new Etat(2, 'En Dépot');
      this.colis.idFournisseur = 0;
    }

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

    this.createColis(this.colis).subscribe(
      data => {
        console.log(data);
        this.formGroup.reset();

      },
      error => console.log(error)
    );
  }



  createColis(c: Colis){

    return this.http.post(this.urlpath, c);
  }
  updateColis(c: Colis){

    return this.http.put(this.urlpath, c);
  }

  getAllColis(){
      return this.http.get<Colis[]>(this.urlpath);
  }

  getAllColisByEtatIds(){
    return this.http.get<Colis[]>(this.urlpath + "ByEtatIds");
  }

  getColisById(id)
  {
    return this.http.get<Colis>(this.urlpath + id);
  }

  deleteColis(id)
  {
    return this.http.delete(this.urlpath + id);
  }

  findByFournisseurIdAndEtat(id)
  {
    return this.http.get(this.urlpath + "findbyIdFournisseur/" + id);
  }

  getcodeQr(code): Observable<Blob>{
    return this.http.get("http://localhost:8081/genrateQRCode/" + code , { responseType: 'blob' });
  }

}
